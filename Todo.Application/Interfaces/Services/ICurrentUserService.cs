namespace Todo.Application.Interfaces.Services
{
    public interface ICurrentUserService
    {
        Task<Guid> GetCurrentUserIdAsync();
    }
}