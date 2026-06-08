using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeavesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeavesController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/leaves
        [HttpPost]
        public async Task<IActionResult> SaveLeaveRecord([FromBody] LeaveManagement leave)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Overtime and Leave record saved successfully!", data = leave });
        }
    }
}