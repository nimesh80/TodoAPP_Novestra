using System;
using System.Collections.Generic;
using System.Text;
using Todo.Application.DTOs.Category;

namespace Todo.Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
       
    }

}
