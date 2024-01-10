import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const UpgradeButton = () => {
  return (
    <Button className="w-full">
      Upgrade now <ArrowRightIcon className="ml-1.5 h-4 w-4" />
    </Button>
  );
};

export default UpgradeButton;
