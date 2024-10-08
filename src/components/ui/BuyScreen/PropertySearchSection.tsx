import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import search from "../../../assets/icons/search.png";
import location from "../../../assets/icons/fi-bs-marker.png";
import home from "../../../assets/icons/fi-bs-home-location.png";
import doller from "../../../assets/icons/Dollar Minimalistic.png";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "../button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { PropertyProps } from "../../../types";

const PropertySearchSection = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [properties, setProperties] = useState<PropertyProps[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query.");
      return;
    }

    try {
      const response = await fetch(
        "https://sm-technology-server.vercel.app/properties"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch properties.");
      }
      const data = await response.json();

      // Filter properties based on the search query
      const filteredProperties = data.filter(
        (property: PropertyProps) =>
          property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setProperties(filteredProperties);
      if (filteredProperties.length === 0) {
        toast.info("No properties found matching your search.");
      }
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("An error occurred while searching properties.");
    }
  };

  return (
    <div className="relative z-10 p-8 shadow-2xl rounded-[8px] mx-auto w-[90%] max-w-[990px] bg-white mt-[-200px]">
      {/* Menu */}
      <div className="flex flex-col sm:flex-row justify-start gap-8 mb-8 border-b border-gray-200 text-[#4B5563]">
        {["Buy", "Rent", "PG", "Plot", "Commercial"].map((item, index) => (
          <button
            key={index}
            className={`py-2 font-medium text-base ${
              index === 0 ? "text-[#0059B1] border-b-2 border-[#0059B1] " : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl font-bold" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Properties by Location or Name"
            className="w-full py-3 pl-14 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* Dropdowns */}
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="relative w-full lg:w-1/3 mb-4 lg:mb-0">
          <span className="flex items-center  mb-4 text-lg font-semibold">
            <img src={location} alt="" className="size-5 mr-2" />
            Your Location
          </span>
          <div className="inline-flex justify-between w-full px-4 py-4 text-sm font-medium bg-[#ECF5FF] rounded-md focus:outline-none">
            <FaChevronDown
              className=" ml-auto text-[#EE6611]"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="relative w-full lg:w-1/3 mb-4 lg:mb-0">
          <span className="flex items-center mb-4 text-lg font-semibold">
            <img src={home} alt="" className="size-5 mr-2" />
            Property Type
          </span>
          <div className="inline-flex justify-between w-full px-4 py-4 text-sm font-medium bg-[#ECF5FF] rounded-md focus:outline-none">
            <FaChevronDown
              className=" ml-auto text-[#EE6611]"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="relative w-full lg:w-1/3 mb-4 lg:mb-0">
          <span className="flex items-center  mb-4 text-lg font-semibold">
            <img src={doller} alt="" className="size-5 mr-2" />
            Budget
          </span>
          <div className="inline-flex justify-between w-full px-4 py-4 text-sm font-medium bg-[#ECF5FF] rounded-md focus:outline-none">
            <FaChevronDown
              className=" ml-auto text-[#EE6611]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      {/* Search Button */}
      <div className="mt-4">
        <Button
          onClick={handleSearch}
          className="bg-[#005EAE] border border-[#005EAE] hover:bg-[#005EAE] hover:border-[#005EAE] text-white w-full py-3 flex justify-center items-center rounded-[8px]"
        >
          <span>
            <img src={search} alt="Search" />
          </span>
          <span className="ml-3 md:text-lg">Find Property</span>
        </Button>
      </div>
      {/* Display Properties */}
      {properties.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold">
            Search Results: {properties.length}
          </h3>

          <ul>
            {properties.map((property, index) => (
              <li key={index} className="border-b py-2">
                <div>
                  <h4 className="text-lg font-semibold">{property.name}</h4>
                  <p>{property.location}</p>
                  <p>${property.price}</p>
                  <Link to={`/propertyDetails/${property._id}`}>
                    <Button
                      className="mt-4 text-white bg-blue-500"
                      variant={"outline"}
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertySearchSection;
