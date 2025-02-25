import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { Link } from "react-router-dom";

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="relative px-4 sm:px-8 py-4 sm:py-8">
      <Link 
        to="/" 
        className="absolute left-4 sm:left-8 top-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        <Button variant="blue" size="sm" className="text-sm sm:text-base">
          <span>←</span> Back to Home
        </Button>
      </Link>
      
      <h1 className="gradient-title font-extrabold text-3xl sm:text-6xl text-center pb-4 sm:pb-8 mt-14 sm:mt-0">
        Top Rated Hospitals
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row w-full gap-2 sm:gap-2 mb-3"
      >
        <Input
          type="text"
          placeholder="Search Hospital.."
          name="search-query"
          className="h-12 sm:h-14 flex-1 px-4 text-sm sm:text-md"
        />
        <Button 
          type="submit" 
          className="h-12 sm:h-14 w-full sm:w-28" 
          variant="blue"
        >
          Search 
        </Button>
      </form>

      <div className="flex flex-col gap-2 sm:gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Select value={location} onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="h-12 sm:h-14">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {State.getStatesOfCountry("IN").map(({ name }) => {
                  return (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={company_id}
            onValueChange={(value) => setCompany_id(value)}
          >
            <SelectTrigger className="h-12 sm:h-14">
              <SelectValue placeholder="Filter by Hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies?.map(({ name, id }) => {
                  return (
                    <SelectItem key={name} value={id}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          className="h-12 sm:h-14 w-full"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div className="text-center col-span-full text-gray-400">
              No Hospitals Found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;