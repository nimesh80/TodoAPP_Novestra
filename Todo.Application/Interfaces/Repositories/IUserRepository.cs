using System;
using System.Collections.Generic;
using System.Text;
using Todo.Domain.Entities;

namespace Todo.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);

        Task<User?> GetByEmailAsync(string email);

        Task<User?> GetByAuth0IdAsync(string auth0Id);

        Task AddAsync(User user);

        Task UpdateAsync(User user);
    }
}
