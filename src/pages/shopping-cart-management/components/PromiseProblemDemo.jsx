import { useState } from "react";
import Icon from "@/components/AppIcon";
import Button from "@/components/ui/Button";

const PromiseProblemDemo = () => {
  const [promiseAllResult, setPromiseAllResult] = useState(null);
  const [promiseAllSettledResult, setPromiseAllSettledResult] = useState(null);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingSettled, setIsLoadingSettled] = useState(false);

  // Simulated API calls
  const fetchUserData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: "John Doe", email: "john@example.com" });
      }, 1000);
    });
  };

  const fetchOrderHistory = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Order service temporarily unavailable"));
      }, 1500);
    });
  };

  const fetchWishlist = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ items: ["Product A", "Product B", "Product C"] });
      }, 800);
    });
  };

  const fetchRecommendations = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Recommendation engine timeout"));
      }, 2000);
    });
  };

  const handlePromiseAll = async () => {
    setIsLoadingAll(true);
    setPromiseAllResult(null);

    try {
      const results = await Promise.all([
        fetchUserData(),
        fetchOrderHistory(),
        fetchWishlist(),
        fetchRecommendations(),
      ]);

      setPromiseAllResult({
        success: true,
        data: results,
        message: "All promises resolved successfully",
      });
    } catch (error) {
      setPromiseAllResult({
        success: false,
        error: error?.message,
        message: "Error",
      });
    } finally {
      setIsLoadingAll(false);
    }
  };

  const handlePromiseAllSettled = async () => {
    setIsLoadingSettled(true);
    setPromiseAllSettledResult(null);

    try {
      const results = await Promise.allSettled([
        fetchUserData(),
        fetchOrderHistory(),
        fetchWishlist(),
        fetchRecommendations(),
      ]);

      const successCount = results?.filter(
        (r) => r?.status === "fulfilled",
      )?.length;
      const failureCount = results?.filter(
        (r) => r?.status === "rejected",
      )?.length;

      setPromiseAllSettledResult({
        success: true,
        results: results,
        successCount,
        failureCount,
        message: `Completed: ${successCount} succeeded, ${failureCount} failed`,
      });
    } catch (error) {
      setPromiseAllSettledResult({
        success: false,
        error: error?.message,
      });
    } finally {
      setIsLoadingSettled(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <Icon
          name="Zap"
          size={24}
          color="var(--color-warning)"
          className="flex-shrink-0 mt-0.5"
        />
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
            Promise Problems
          </h3>
        </div>
      </div>
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">
              Promise.all
            </h4>
            <Button
              onClick={handlePromiseAll}
              disabled={isLoadingAll}
              size="sm"
              variant="outline"
              iconName={isLoadingAll ? "Loader" : "Play"}
              iconPosition="left"
            >
              {isLoadingAll ? "Loading..." : "Run Promise.all"}
            </Button>
          </div>

          {promiseAllResult && (
            <div
              className={`rounded p-3 ${
                promiseAllResult?.success
                  ? "bg-success/10 border border-success"
                  : "bg-error/10 border border-error"
              }`}
            >
              <p className="text-xs font-semibold text-foreground mb-1">
                {promiseAllResult?.success ? "✅ Success" : "❌ Failed"}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {promiseAllResult?.message}
              </p>
              {promiseAllResult?.error && (
                <p className="text-xs text-error font-mono">
                  Error: {promiseAllResult?.error}
                </p>
              )}
              {promiseAllResult?.data && (
                <pre className="text-xs bg-background rounded p-2 overflow-x-auto">
                  {JSON.stringify(promiseAllResult?.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">
              Promise.allSettled
            </h4>
            <Button
              onClick={handlePromiseAllSettled}
              disabled={isLoadingSettled}
              size="sm"
              variant="outline"
              iconName={isLoadingSettled ? "Loader" : "Play"}
              iconPosition="left"
            >
              {isLoadingSettled ? "Loading..." : "Run Promise.allSettled"}
            </Button>
          </div>

          {promiseAllSettledResult && (
            <div className="bg-primary/10 border border-primary rounded p-3">
              <p className="text-xs font-semibold text-foreground mb-1">
                ✅ Completed
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {promiseAllSettledResult?.message}
              </p>
              <div className="space-y-2">
                {promiseAllSettledResult?.results?.map((result, index) => (
                  <div
                    key={index}
                    className={`text-xs rounded p-2 ${
                      result?.status === "fulfilled"
                        ? "bg-success/10 border border-success"
                        : "bg-error/10 border border-error"
                    }`}
                  >
                    <p className="font-semibold mb-1">
                      {result?.status === "fulfilled" ? "✅" : "❌"}{" "}
                      {
                        [
                          "User Data",
                          "Order History",
                          "Wishlist",
                          "Recommendations",
                        ]?.[index]
                      }
                    </p>
                    {result?.status === "fulfilled" ? (
                      <pre className="text-xs bg-background rounded p-1 overflow-x-auto">
                        {JSON.stringify(result?.value, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-error font-mono">
                        {result?.reason?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromiseProblemDemo;
