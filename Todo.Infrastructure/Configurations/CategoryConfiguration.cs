using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Todo.Domain.Entities;

namespace Todo.Infrastructure.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            //primary key
            builder.HasKey(c => c.CategoryId);

            //name
            builder.Property(c => c.CategoryName)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
