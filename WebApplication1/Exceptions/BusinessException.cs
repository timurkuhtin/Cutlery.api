using System;

namespace WebApplication1.Exceptions
{
    public class BusinessException : Exception
    {
        public string ErrorMessage { get; set; }

        public BusinessException(string errorMessage) : base()
        {
            ErrorMessage = errorMessage;
        }
    }
}
