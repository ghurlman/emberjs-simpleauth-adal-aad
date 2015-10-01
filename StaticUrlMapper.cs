using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using System.Linq;
using System;

namespace SimpleAdal
{
	internal class StaticUrlMapperOptions
	{
		public string HtmlFileToMapTo { get; set; }
		public string[] FilePathsToIgnore { get; set; }
	}

	internal class StaticUrlMapper
	{
		public RequestDelegate Next { get; private set; }
		public StaticUrlMapperOptions Options { get; private set; }

		public StaticUrlMapper(RequestDelegate next, StaticUrlMapperOptions options)
		{
			Next = next;
			Options = options;
		}

		public async Task Invoke(HttpContext context)
		{
			if (!Options.FilePathsToIgnore.Any(s => context.Request.Path.Value.StartsWith(s)))
			{
				context.Request.Path = $"/{Options.HtmlFileToMapTo}";
			}

			await Next.Invoke(context);
		}
	}

	internal static class StaticUrlMapperExtensions
	{
		public static IApplicationBuilder UseStaticUrl(this IApplicationBuilder app, Action<StaticUrlMapperOptions> configure)
		{
			var options = new StaticUrlMapperOptions();
			configure(options);

			return app.UseMiddleware<StaticUrlMapper>(options);
		}
	}
}