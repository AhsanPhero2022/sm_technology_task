import imageCount from "../../assets/icons/Image count.png";
import { FiLoader } from "react-icons/fi";
import location from "../../assets/icons/fi-bs-marker.png";
import { Button } from "../ui/button";
import { BsTextarea } from "react-icons/bs";
import { VscLayoutStatusbar } from "react-icons/vsc";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import { PropertyProps } from "../../types";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

const PropertyWin = () => {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const currentUserId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sm-technology-server.vercel.app/properties"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const filteredProperties = data.filter(
          (property: PropertyProps) => property.userId === currentUserId
        );

        setProperties(filteredProperties);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://sm-technology-server.vercel.app/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProperties((prev) => prev.filter((property) => property._id !== id));
        toast.success("Property deleted successfully!");
      } else {
        toast.error("Failed to delete property.");
      }
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-20">
      <Container>
        <div className="flex justify-between  sm:items-center mb-6 flex-col sm:flex-row">
          <h1 className="text-3xl text-[#111827] font-bold mb-3 sm:mb-0">
            Your winner all properties
          </h1>
          <h1 className="text-3xl text-[#111827] font-bold mb-3 sm:mb-0">
            Total Property: {properties.length}
          </h1>
        </div>
        <div className="">
          {properties.map((property: PropertyProps) => (
            <div key={property._id}>
              <div className="bg-[#F9FAFB] grid lg:grid-cols-12 my-8">
                <div className="max-h-[200px] lg:col-span-4 ">
                  <img
                    className="w-full lg:w-80 max-h-[200px]"
                    src={property.image}
                    alt={property.name}
                  />

                  <img
                    src={imageCount}
                    className="w-10 h-5 -mt-[30px] ml-2"
                    alt=""
                  />
                </div>
                <div className="p-4 lg:col-span-8 ">
                  <div className="flex justify-between items-center my-3">
                    <p className="text-3xl font-bold ">{property.name}</p>

                    <p className="text-3xl font-bold">${property.price}k</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-1 text-[#6B7280] font-normal mt-1">
                      <img src={location} alt="" className="size-4" />
                      {property.location}
                    </p>

                    <Button
                      onClick={() => handleDelete(property._id)}
                      variant={"destructive"}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="flex justify-start items-center">
                    <p className="w-[150px]">Property details</p>
                    <hr className=" bg-yellow-500 w-full text-[#D8DCE1] border-[#D8DCE1] mx-auto" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <FiLoader className="w-8 h-8 bg-orange-500 p-1 rounded" />
                      <p>
                        Total Area <br />
                        <span className="text-sm flex-none">891 sqft</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <BsTextarea className="w-8 h-8 bg-orange-500 p-1 rounded" />
                      <p>
                        Total Area <br />
                        <span className="text-sm flex-none">Ready to move</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <VscLayoutStatusbar className="w-8 h-8 bg-orange-500 p-1 rounded" />
                      <p>
                        Total Area <br />
                        <span className="text-sm flex-none">891 sqft</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PropertyWin;
