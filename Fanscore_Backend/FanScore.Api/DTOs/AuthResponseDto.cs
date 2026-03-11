using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FanScore.Api.DTOs
{
    public class AuthResponseDto
    {
        public int UserId { get; set; }
        public string Email { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}