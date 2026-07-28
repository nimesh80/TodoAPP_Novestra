using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Todo.Domain.Entities;

namespace Todo.Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //primary key
            builder.HasKey(u => u.UserId);

            //first name
            builder.Property(u => u.FirstName)
                .IsRequired()
                .HasMaxLength(100);

            //last name
            builder.Property(u => u.LastName)
                .IsRequired()
                .HasMaxLength(100);

            //email
            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(255);

            //unique index on email
            builder.HasIndex(u => u.Email)
                .IsUnique();

            //created at
            builder.Property(u => u.CreatedAt)
                .IsRequired();
        }
    }
}
