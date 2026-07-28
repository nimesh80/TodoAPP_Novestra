using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Todo.Domain.Entities; 

namespace Todo.Infrastructure.Configurations
{
    public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItem>
    {
        public void Configure(EntityTypeBuilder<TaskItem> builder)
        {
            //primary key
            builder.HasKey(t => t.TaskId);

            //title
            builder.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(255);

            //description
            builder.Property(t => t.Description)
                .HasMaxLength(1000);

            // Relationships
            builder.HasOne(t => t.User)
                   .WithMany(u => u.Tasks)
                   .HasForeignKey(t => t.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(t => t.Category)
                   .WithMany(c => c.Tasks)
                   .HasForeignKey(t => t.CategoryId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.Property(t => t.Priority)
                   .HasConversion<string>();

            builder.Property(t => t.Status)
                   .HasConversion<string>();
        }
    }
}
