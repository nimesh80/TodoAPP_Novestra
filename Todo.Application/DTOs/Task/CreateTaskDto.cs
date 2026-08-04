using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Todo.Domain.Enums;

namespace Todo.Application.DTOs.Task
{
    public class CreateTaskDto
    {
        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public TaskPriority Priority { get; set; }

        public DateTime? DueDate { get; set; }

      
       
      
    }
}
