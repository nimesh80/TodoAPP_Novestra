using System;
using System.Collections.Generic;
using System.Text;
using Todo.Domain.Enums;

namespace Todo.Domain.Entities
{
    public class TaskItem
    {
        public Guid TaskId { get; set; }
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }

        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
       
        public TaskPriority Priority { get; set; }
        public TaskState Status { get; set; }
        


        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CompletedAt  { get; set; }

        //Navigation properties

        public User User { get; set; } = null!;
        public Category Category { get; set; } = null!;
    }
}
