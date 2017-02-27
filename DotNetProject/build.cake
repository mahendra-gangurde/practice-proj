#tool "nuget:?package=NUnit.ConsoleRunner"
#addin "Cake.WebDeploy"

var configuration = Argument("configuration", "Release");
var packageDir = MakeAbsolute(Directory("../Project_Package"));

Task("Publish")
    .Description("Publish the website to a package at " + packageDir)
    .Does(() =>
{ 
	RunTarget("BuildRelease");
});

Task("BuildRelease")  
  .Does(() =>
{
  DotNetBuild("./Project.sln", settings => settings.SetConfiguration("Release"));
});

var target = Argument("target", "Publish");
RunTarget(target);
