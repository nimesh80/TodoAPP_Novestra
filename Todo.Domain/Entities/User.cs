using System;
using System.Collections.Generic;
using System.Text;

namespace Todo.Domain.Entities
{

    public class User
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        //Navigation property for related tasks
        //One User - Many TaskItems
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
