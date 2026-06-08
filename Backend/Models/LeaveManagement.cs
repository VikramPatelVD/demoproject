using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class LeaveManagement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string EmployeeName { get; set; } = string.Empty;   // ✅ default value avoids null warning

        [Required]
        public int OvertimeHours { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]   // ✅ explicit precision for SQL Server
        public decimal HourlyRate { get; set; }

        [Column(TypeName = "decimal(18,2)")]   // ✅ same for calculated field
        public decimal TotalOvertimePay { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}