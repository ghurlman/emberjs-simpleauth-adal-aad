using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Configuration;
using Microsoft.AspNet.Hosting;
using Microsoft.Dnx.Runtime;
using System.IdentityModel.Tokens;
using Microsoft.AspNet.Authentication.OAuthBearer;

namespace SimpleAdal
{
	public class Startup
	{
		public IConfiguration Settings { get; private set; }

		public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
		{
			var builder = new ConfigurationBuilder(appEnv.ApplicationBasePath)
					.AddJsonFile("config.json", optional: true)
					.AddJsonFile($"config.{env.EnvironmentName}.json", optional: true);

			builder.AddEnvironmentVariables();
			Settings = builder.Build();
		}

		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.ConfigureOAuthBearerAuthentication(options =>
			{
				options.AuthenticationScheme = OAuthBearerAuthenticationDefaults.AuthenticationScheme;
				options.Audience = Settings["ida:Audience"];
				options.MetadataAddress = "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration";
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidAudience = Settings["ida:Audience"],
					ValidateIssuer = false
				};
			});

			services.AddMvc();
		}

		public void Configure(IApplicationBuilder app)
		{
			app.UseOAuthBearerAuthentication(options =>
			{
				options.AuthenticationScheme = OAuthBearerAuthenticationDefaults.AuthenticationScheme;
			});

			app.UseStaticUrl(options =>
			{
				options.HtmlFileToMapTo = "index.html";
				options.FilePathsToIgnore = new string[]
				{
					"/api",
					"/assets",
					"/fonts",
					"/tests",
					"/testem.js",
					"/robots.txt",
					"/crossdomain.txt"
				};
			});
			app.UseStaticFiles();
			app.UseMvc();
		}
	}
}
