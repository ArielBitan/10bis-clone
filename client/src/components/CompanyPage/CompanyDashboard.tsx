import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { searchUserByEmail } from "@/services/userService";
import { IUser } from "@/types/userType";
import debounce from "lodash.debounce";

const CompanyDashboard = () => {
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IUser[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Debounced search function
  const debouncedSearch = debounce(async (email: string) => {
    if (email) {
      setIsSearching(true);
      try {
        const users = await searchUserByEmail(email);
        setSearchResults(users || null);
      } catch (error) {
        console.error("Error searching for user:", error);
        setSearchResults(null);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults(null); // Clear search results if the email is empty
    }
  }, 500); // Delay of 500ms after typing stops

  // Handle input change and trigger debounced search
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
    debouncedSearch(e.target.value); // Trigger debounced search
  };

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedUser && userRole) {
      setSearchEmail("");
      setSearchResults(null);
      setSelectedUser(null);
      setUserRole("");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" dir="rtl">
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            פרטי החברה
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">מידע כללי</h3>
              <div className="mt-2 space-y-2">
                <p>שם: {company.name}</p>
                <p>סטטוס: {company.status}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium">פרטי התקשרות</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {company.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {company.website}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">מידע על חיובים</h3>
              <div className="mt-2 space-y-2">
                <p>סכום: ₪{company.charge_amount}</p>
                <p>תדירות חיוב: {company.recharge_rate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Employee Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            הוספת עובדים
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex gap-4">
            <Input
              placeholder="חפש משתמש לפי אימייל"
              value={searchEmail}
              onChange={handleSearchInputChange} // Use the new change handler
            />
            <Button type="button" className="flex gap-2">
              <Search className="h-4 w-4" /> חפש
            </Button>
          </div>

          {isSearching && <div className="mb-6 text-center">מחפש משתמש...</div>}

          {searchResults && !selectedUser && (
            <Card className="mb-6 p-4">
              <div className="flex gap-4 flex-col">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="w-full grid grid-cols-4 gap-4 items-center text-center"
                  >
                    <h4 className="font-medium truncate">{user.full_name}</h4>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.phone}
                    </p>
                    <Button
                      onClick={() => setSelectedUser(user)}
                      className="flex gap-2"
                    >
                      <UserPlus className="h-4 w-4" /> בחר משתמש
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {selectedUser && (
            <form onSubmit={handleAddEmployee} className="mb-6 space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">הוספת משתמש נבחר</h4>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">שם:</p>
                      <p>{selectedUser.full_name}</p>
                    </div>
                    <div>
                      <p className="font-medium">אימייל:</p>
                      <p>{selectedUser.email}</p>
                    </div>
                  </div>
                  <Input
                    placeholder="תפקיד"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit">הוסף לחברה</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedUser(null)}
                    >
                      בטל
                    </Button>
                  </div>
                </div>
              </Card>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;
