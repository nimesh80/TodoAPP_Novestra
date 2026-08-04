using System;
using System.Collections.Generic;
using System.Text;
using Todo.Application.DTOs.Category;
using Todo.Application.Interfaces.Services;
using Todo.Application.Interfaces.Repositories;

namespace Todo.Application.Services
{
   public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
           
            return categories.Select(category => new CategoryDto
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName
            });

           
        }
    }
}
