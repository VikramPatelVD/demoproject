using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Read connection string from environment variable or appsettings.json
var connectionString = Environment.GetEnvironmentVariable("SQLSERVER_URL")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

// Register DbContext with SQL Server provider
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Allow any frontend origin (for development / production)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
// app.UseCors(); // Use the default CORS policy defined above
app.UseAuthorization();
app.MapControllers();

// Create database and tables if they don't exist (using EnsureCreated)
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.EnsureCreated();  // Creates the database and tables based on your models
        Console.WriteLine("Database ready.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database error: {ex.Message}");
    }
}

// Serve static files (React build will be in wwwroot)
app.UseDefaultFiles();
app.UseDeveloperExceptionPage();
app.UseStaticFiles();
app.UseRouting();
//app.MapFallbackToFile("index.html"); // For React Router support

app.Run();