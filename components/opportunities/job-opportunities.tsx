import { useJobOpportunities } from "@/hooks/useJobOpportunities";
import { Loader } from "../ui/loader";
import { Error } from "../ui/error";
import { OpportunityListCard } from "./opportunity-list-card";
import { useTranslations } from "next-intl";

export function JobOpportunities() {
  const t = useTranslations("opportunities");
  const { data, isLoading, error } = useJobOpportunities();

  if (isLoading) {
    return <Loader children={t("loading")} />;
  }

  if (error) {
    return <Error>{error.message}</Error>;
  }

  if (!data) {
    return <Error>{t("noData")}</Error>;
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {data?.jobOpportunities.length > 0 ? (
        data?.jobOpportunities.map((jobOpportunity) => (
          <OpportunityListCard key={jobOpportunity.id} {...jobOpportunity} />
        ))
      ) : (
        <p className="text-center text-foreground py-8">
          {t("noOpportunities")}
        </p>
      )}
    </div>
  );
}
