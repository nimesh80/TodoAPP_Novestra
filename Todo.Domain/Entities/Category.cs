using System;
using System.Collections.Generic;
using System.Text;

namespace Todo.Domain.Entities
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;

        //Navigation property for related tasks
        //one category can have many tasks
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
