using System;
using System.Collections.Generic;
using System.Text;
using Todo.Domain.Enums;

namespace Todo.Application.DTOs.Task
{
    public class TaskDto
    {
        public Guid TaskId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public TaskPriority Priority { get; set; }
        public TaskState Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

    }
}
