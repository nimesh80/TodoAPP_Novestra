using System;
using System.Collections.Generic;
using System.Text;
using Todo.Application.DTOs.Task;

namespace Todo.Application.Interfaces.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllTasksAsync();
        Task<TaskDto?> GetTaskByIdAsync(Guid id);
        Task CreateTaskAsync(CreateTaskDto taskDto, Guid userId);
        Task UpdateTaskAsync(Guid id, UpdateTaskDto taskDto);
        Task DeleteTaskAsync(Guid id);
    }
}
