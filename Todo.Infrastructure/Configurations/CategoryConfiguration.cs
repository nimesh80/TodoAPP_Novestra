using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Todo.Domain.Entities;

namespace Todo.Infrastructure.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.CategoryId);

            builder.Property(c => c.CategoryName)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasData(
                new Category
                {
                    CategoryId = new Guid("11111111-1111-1111-1111-111111111111"),
                    CategoryName = "Work"
                },
                new Category
                {
                    CategoryId = new Guid("22222222-2222-2222-2222-222222222222"),
                    CategoryName = "Personal"
                },
                new Category
                {
                    CategoryId = new Guid("33333333-3333-3333-3333-333333333333"),
                    CategoryName = "Study"
                },
                new Category
                {
                    CategoryId = new Guid("44444444-4444-4444-4444-444444444444"),
                    CategoryName = "Shopping"
                },
                new Category
                {
                    CategoryId = new Guid("55555555-5555-5555-5555-555555555555"),
                    CategoryName = "Health"
                }
            );
        }
    }
}