using System;
using System.Collections.Generic;
using System.Text;
using Todo.Domain.Entities; 

namespace Todo.Application.Interfaces.Repositories
{
   public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllAsync();
        Task<TaskItem?> GetByIdAsync(Guid id);

        Task<IEnumerable<TaskItem>> GetByUserIdAsync(Guid userId);
        Task AddAsync(TaskItem task);
        Task UpdateAsync(TaskItem task);
        Task DeleteAsync(TaskItem task);
    }
}
