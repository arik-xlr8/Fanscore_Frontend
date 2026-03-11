using FanScore.Api.Data;
using FanScore.Api.DTOs;
using FanScore.Api.Models;
using FanScore.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FanScore.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (existingUser != null)
            {
                return BadRequest("Bu email zaten kullanımda.");
            }

            var user = new User
            {
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.CreateToken(
                user.UserId,
                user.Email,
                user.Role
            );

            var response = new AuthResponseDto
            {
                UserId = user.UserId,
                Email = user.Email,
                Token = token
            };

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (user == null)
            {
                return Unauthorized("Email veya şifre hatalı.");
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);

            if (!isPasswordValid)
            {
                return Unauthorized("Email veya şifre hatalı.");
            }

            var token = _tokenService.CreateToken(
                user.UserId,
                user.Email,
                user.Role
            );

            var response = new AuthResponseDto
            {
                UserId = user.UserId,
                Email = user.Email,
                Token = token
            };

            return Ok(response);
        }
    }
}