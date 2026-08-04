using System;
using System.Collections.Generic;
using System.Text;

namespace Todo.Application.DTOs.Category
{
    public class CategoryDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        
    }
}
