import { useJobOpportunities } from "@/hooks/useJobOpportunities";
import { Loader } from "../ui/loader";
import { Error } from "../ui/error";
import { OpportunityListCard } from "./opportunity-list-card";

export function JobOpportunities() {
  const { data, isLoading, error } = useJobOpportunities();

  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error>{error.message}</Error>;
  }

  if (!data) {
    return <Error>No data found</Error>;
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {data?.jobOpportunities.length > 0 ? (
        data?.jobOpportunities.map((jobOpportunity) => (
          <OpportunityListCard key={jobOpportunity.id} {...jobOpportunity} />
        ))
      ) : (
        <p>No job opportunities found</p>
      )}
    </div>
  );
}
