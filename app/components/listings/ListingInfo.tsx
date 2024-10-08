import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(()=>import('../Map'),{
    ssr:false
})

interface ListinInfoProps {
    user: SafeUser;
    description: string,
    guestCount : number;
    roomCount : number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue : string;
}

const ListingInfo:React.FC<ListinInfoProps> = ({
    user,
    locationValue,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category
}) => {
    const {getByValue} = useCountries();
    const coordiantes = getByValue(locationValue)?.latlng;

    return ( 
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2 ">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div className="">Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div className="">{guestCount} guests</div>
                    <div className="">{roomCount} rooms</div>
                    <div className="">{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map  center={coordiantes}/>
        </div>
      );
}
 
export default ListingInfo;