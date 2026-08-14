using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Todo.Application.Interfaces.Repositories;
using Todo.Application.Interfaces.Services;
using Todo.Domain.Entities;

namespace Todo.Application.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public CurrentUserService(
            IHttpContextAccessor httpContextAccessor,
            IUserRepository userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<Guid> GetCurrentUserIdAsync()
        {
            var user = _httpContextAccessor.HttpContext?.User;

            if (user == null || !user.Identity?.IsAuthenticated == true)
            {
                throw new UnauthorizedAccessException(
                    "User is not authenticated."
                );
            }

            // Get Auth0 user ID
            var auth0Id =
                user.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? user.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(auth0Id))
            {
                throw new UnauthorizedAccessException(
                    "Auth0 user ID was not found."
                );
            }

            // 1. Check by Auth0 ID
            var existingUser =
                await _userRepository.GetByAuth0IdAsync(auth0Id);

            if (existingUser != null)
            {
                return existingUser.UserId;
            }

            // 2. Get email from Auth0 claim
            var email =
                user.FindFirst("https://todoapi/email")?.Value
                ?? user.FindFirst(ClaimTypes.Email)?.Value
                ?? user.FindFirst("email")?.Value;

            if (string.IsNullOrWhiteSpace(email))
            {
                throw new UnauthorizedAccessException(
                    "Email was not found in the Auth0 token."
                );
            }

            // 3. Check whether a local user already exists with this email
            existingUser =
                await _userRepository.GetByEmailAsync(email);

            if (existingUser != null)
            {
                // Link existing local account to Auth0 account
                existingUser.Auth0Id = auth0Id;

                await _userRepository.UpdateAsync(existingUser);

                return existingUser.UserId;
            }

            // 4. Get name
            var name =
                user.FindFirst("https://todoapi/name")?.Value
                ?? user.FindFirst("name")?.Value
                ?? user.Identity?.Name
                ?? string.Empty;

            var firstName = name;
            var lastName = string.Empty;

            var nameParts = name
                .Split(' ', StringSplitOptions.RemoveEmptyEntries);

            if (nameParts.Length > 1)
            {
                firstName = nameParts[0];
                lastName = string.Join(
                    " ",
                    nameParts.Skip(1)
                );
            }

            // 5. Create new local user
            var newUser = new User
            {
                UserId = Guid.NewGuid(),
                Auth0Id = auth0Id,
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(newUser);

            return newUser.UserId;
        }
    }
}