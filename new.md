{/_ Right Side Actions _/}
<div className="flex items-center gap-2">
{/_ User Menu _/}
<DropdownMenu>
<DropdownMenuTrigger asChild>
<Button variant="ghost" size="icon">
<User className="h-5 w-5" />
</Button>
</DropdownMenuTrigger>
<DropdownMenuContent align="end" className="bg-white">
<DropdownMenuItem>Profile</DropdownMenuItem>
<DropdownMenuItem>Settings</DropdownMenuItem>
<DropdownMenuItem>Help</DropdownMenuItem>
<DropdownMenuItem>Sign Out</DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>

             variant="ghost" size="sm"
