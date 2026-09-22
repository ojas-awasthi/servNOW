import {
  Bell,
  ExternalLink,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SEARCH_CONFIG = [
  {
    key: "customers",
    label: "Customers",
    route: "/crm/customers",
  },
  {
    key: "providers",
    label: "Providers",
    route: "/crm/providers",
  },
  {
    key: "services",
    label: "Services",
    route: "/crm/services",
  },
  {
    key: "bookings",
    label: "Bookings",
    route: "/crm/bookings",
  },
  {
    key: "leads",
    label: "Leads",
    route: "/crm/leads",
  },
  {
    key: "transactions",
    label: "Transactions",
    route: "/crm/transactions",
  },
  {
    key: "tickets",
    label: "Support Tickets",
    route: "/crm/tickets",
  },
];

function getSearchResultTitle(type, item) {
  switch (type) {
    case "customers":
    case "providers":
      return item.name || item.email || "User";

    case "services":
      return item.title || "Service";

    case "bookings":
      return (
        item.service?.title ||
        item.customer?.name ||
        "Booking"
      );

    case "leads":
      return item.name || item.email || "Lead";

    case "transactions":
      return item.transactionId || "Transaction";

    case "tickets":
      return item.subject || "Support ticket";

    default:
      return "Result";
  }
}

function getSearchResultMeta(type, item) {
  switch (type) {
    case "customers":
    case "providers":
      return item.email || item.phone || "";

    case "services":
      return item.price != null ? `₹${item.price}` : "";

    case "bookings":
      return item.status || "";

    case "leads":
      return item.status || item.priority || "";

    case "transactions":
      return item.status || item.paymentMethod || "";

    case "tickets":
      return item.status || item.priority || "";

    default:
      return "";
  }
}

function CRMTopbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setSearch("");
    setSearchResults(null);
    setSearchError("");
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const handleGoToMarketplace = () => {
    navigate("/");
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      setSearchResults(null);
      setSearchError("");
      return;
    }

    const token = localStorage.getItem("servnow_token");

    if (!token) {
      setSearchError("Your session has expired. Please log in again.");
      return;
    }

    setSearchLoading(true);
    setSearchError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to search CRM."
        );
      }

      setSearchResults(result.data || {});
    } catch (error) {
      setSearchResults(null);
      setSearchError(
        error.message || "Unable to search CRM."
      );
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      setSearch("");
      setSearchResults(null);
      setSearchError("");
    }
  };

  const handleSearchResult = (route, query) => {
    setSearchResults(null);
    navigate(`${route}?search=${encodeURIComponent(query)}`);
  };

  const hasSearchResults =
    searchResults &&
    Object.values(searchResults).some(
      (items) => Array.isArray(items) && items.length > 0
    );

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          {/* LEFT */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open CRM navigation"
              title="Open CRM navigation"
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 lg:hidden"
            >
              <Menu
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>

            {/* GLOBAL CRM SEARCH */}
            <div className="relative hidden min-w-0 max-w-xl flex-1 sm:block">
              <form
                onSubmit={handleSearch}
                role="search"
              >
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition-colors focus-within:border-slate-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-950/5">
                  <Search
                    className="h-4 w-4 shrink-0 text-slate-400"
                    aria-hidden="true"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setSearchResults(null);
                      setSearchError("");
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search CRM..."
                    aria-label="Search CRM"
                    className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setSearchResults(null);
                        setSearchError("");
                      }}
                      aria-label="Clear CRM search"
                      title="Clear search"
                      className="ml-2 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    >
                      <X
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  <kbd className="ml-3 hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 md:inline">
                    Enter
                  </kbd>
                </div>
              </form>

              {search && (
                <SearchDropdown
                  loading={searchLoading}
                  error={searchError}
                  results={searchResults}
                  hasResults={hasSearchResults}
                  query={search}
                  onSelect={handleSearchResult}
                />
              )}
            </div>

            {/* MOBILE TITLE */}
            <div className="sm:hidden">
              <p className="text-sm font-semibold text-slate-950">
                ServNOW CRM
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex shrink-0 items-center gap-1">
            {/* BACK TO SERVNOW */}
            <button
              type="button"
              onClick={handleGoToMarketplace}
              title="Back to ServNOW"
              aria-label="Back to ServNOW homepage"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 md:flex"
            >
              <ExternalLink
                className="h-4 w-4"
                aria-hidden="true"
              />

              <span>View ServNOW</span>
            </button>

            {/* NOTIFICATIONS */}
            <button
              type="button"
              aria-label="View notifications"
              title="Notifications"
              className="relative rounded-lg p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
            >
              <Bell
                className="h-5 w-5"
                aria-hidden="true"
              />

              <span
                className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500"
                aria-hidden="true"
              />
            </button>

            <div className="ml-1 hidden h-8 w-px bg-slate-200 sm:block" />

            {/* USER */}
            <div className="ml-1 hidden items-center gap-2 sm:flex">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white"
                aria-hidden="true"
              >
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <div className="hidden max-w-32 lg:block">
                <p className="truncate text-xs font-semibold text-slate-900">
                  {user?.name || "Administrator"}
                </p>

                <p className="text-[11px] capitalize text-slate-400">
                  {user?.role || "admin"}
                </p>
              </div>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout from ServNOW CRM"
                className="ml-1 rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <LogOut
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* MOBILE LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout from ServNOW CRM"
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:hidden"
            >
              <LogOut
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="border-t border-slate-100 px-4 py-3 sm:hidden">
          <div className="relative">
            <form
              onSubmit={handleSearch}
              role="search"
            >
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-300 focus-within:bg-white">
                <Search
                  className="h-4 w-4 shrink-0 text-slate-400"
                  aria-hidden="true"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setSearchResults(null);
                    setSearchError("");
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search CRM..."
                  aria-label="Search CRM"
                  className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </form>

            {search && (
              <SearchDropdown
                loading={searchLoading}
                error={searchError}
                results={searchResults}
                hasResults={hasSearchResults}
                query={search}
                onSelect={handleSearchResult}
              />
            )}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <MobileCRMNavigation
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

function SearchDropdown({
  loading,
  error,
  results,
  hasResults,
  query,
  onSelect,
}) {
  if (!loading && !error && !results) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
      {loading && (
        <div className="px-3 py-4 text-sm text-slate-500">
          Searching CRM...
        </div>
      )}

      {!loading && error && (
        <div className="px-3 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && results && !hasResults && (
        <div className="px-3 py-4">
          <p className="text-sm font-medium text-slate-800">
            No results found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try another name, email, service, lead, transaction or ticket.
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        results &&
        hasResults &&
        SEARCH_CONFIG.map((section) => {
          const items = results[section.key];

          if (!Array.isArray(items) || items.length === 0) {
            return null;
          }

          return (
            <div
              key={section.key}
              className="mb-2 last:mb-0"
            >
              <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {section.label}
              </div>

              {items.map((item, index) => {
                const title = getSearchResultTitle(
                  section.key,
                  item
                );

                const meta = getSearchResultMeta(
                  section.key,
                  item
                );

                return (
                  <button
                    key={
                      item._id ||
                      item.id ||
                      item.transactionId ||
                      `${section.key}-${index}`
                    }
                    type="button"
                    onClick={() =>
                      onSelect(section.route, query)
                    }
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {title}
                      </p>

                      {meta && (
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {meta}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-[10px] font-medium text-slate-400">
                      {section.label}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

function MobileCRMNavigation({ onClose }) {
  const navigate = useNavigate();

  const handleMarketplace = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        aria-label="Close CRM navigation"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40"
      />

      <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-5">
          <div>
            <p className="text-lg font-bold text-slate-950">
              ServNOW
            </p>

            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              CRM Console
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close CRM navigation"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
          >
            <X
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="p-5">
          <button
            type="button"
            onClick={handleMarketplace}
            className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
          >
            <ExternalLink
              className="h-4 w-4"
              aria-hidden="true"
            />

            View ServNOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default CRMTopbar;