import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Profile = ({imageUrl, className}:{imageUrl:string, className?: string}) => {
  return (
    <div className={cn("rounded-sm overflow-hidden", className)} >
      <Avatar className="" >
        <AvatarImage src={imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Profile;
