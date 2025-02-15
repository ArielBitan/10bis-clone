import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import UserIcon from "./UserIcon";
import LogInModal from "../LandingPage/modals/LoginModal";
import { Link, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";

const UserMenu = () => {
  const { user, fetchUser, logout } = useUser();
  const location = useLocation();
  const role = user?.role;

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogOut = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <div className="flex items-center gap-2 cursor-pointer">
                <UserIcon width={40} height={40} fill="#000" />
                <div className="font-medium text-white">{`היי , ${user.first_name}`}</div>
                <img
                  alt=""
                  src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/header_triangle_button-13bd22.svg"
                ></img>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuGroup>
              <Link to="/edit-user" state={{ backgroundLocation: location }}>
                <DropdownMenuItem>
                  <div>פרטים אישיים</div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              {role === "courier" ? (
                <Link to="/courier-salary">
                  <DropdownMenuItem>תלוש משכורת</DropdownMenuItem>
                </Link>
              ) : (
                <Link to="/charges-report">
                  <DropdownMenuItem>דו"ח חיובים</DropdownMenuItem>
                </Link>
              )}

              {!role && (
                <Link to="/courier-register">
                  <DropdownMenuItem>
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="StyledScooberLogoIcon-livxTd fvNcJQ avoid-fill-stroke"
                      >
                        <path
                          fill="#D9D4D1"
                          d="M16.444 19.369c.03-.604-.375-1.977-1.275-2.325s-2.044-.492-2.644.705c-.6 1.196-.154 1.991.079 2.572s1.226 1.088 2.059.99a2.126 2.126 0 0 0 1.78-1.942M8.584 18.116H4.53c-.03.69.118 1.376.431 1.992.525 1.05 1.602 1.17 2.273 1.256s2.178-.814 1.35-3.248"
                        ></path>
                        <path
                          fill="#FFAB59"
                          d="M19.001 13.759c.896.052 1.673-.075 1.448-1.553a20 20 0 0 0-.705-3.315c-.24-.637-.109-1.125-2.273-1.05s-2.812-.285-3.116.567c-.304.85-.176 2.11.135 3.048s.277 1.594.619 1.939 1.005.353 1.5.375S19 13.759 19 13.759"
                        ></path>
                        <path
                          fill="#FFAB59"
                          d="m14.85 12.608-5.666-.128.266 1.586-1.804 1.369-.956-4.71-1.733-.165-1.77 3.57 1.092.18S2.828 16.639 3 18.218l7.185.067s.461-3 3.247-3 3.41.956 3.957 1.841a4.78 4.78 0 0 0-.431-3.375 4 4 0 0 1-1.388-.165 1.35 1.35 0 0 1-.72-.979M9.679 6.773l2.846.116a8.4 8.4 0 0 0 .69-2.096c.165-1.032-1.027-1.977-2.141-1.977-1.197 0-1.875.285-2.074 1.692l1.819.28-.263 1.043-1.575.094z"
                        ></path>
                        <path
                          fill="#C9ECF2"
                          d="M13.5 11.389a6.1 6.1 0 0 1-1.687-.315 13 13 0 0 1-1.276-.638q-1.154.405-2.25.953c-.3.24.124 1.612.214 2.051s.375 2.059.375 2.059q.675-.02 1.343-.124c.075-.068-.293-1.721-.293-1.721l-.247-1.279h2.936c.409-.206.725-.558.885-.986"
                        ></path>
                        <path
                          fill="#FFAB59"
                          d="M13.406 11.509a3.67 3.67 0 0 0-.12-1.902c-.375-.802-.75-1.68-.75-1.68l-.42-1.057-1.335.026-.056.979-3.596.049s-.649-.45-1.084-.207-.75.465-.671.95c.079.483-.023.75.461.787a.98.98 0 0 0 .787-.21c.243-.076.497-.11.75-.098l2.948.199.232 1.087q.537.338 1.126.578c.513.188 1.728.499 1.728.499"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M7.387 10.568q.326 2.3.904 4.552a.424.424 0 0 1-.814.225c-.385-1.5-.687-3.02-.903-4.552a.435.435 0 0 1 .296-.518.42.42 0 0 1 .517.293M10.365 18.454c-2.351 0-4.699-.068-7.046-.068a.424.424 0 0 1 0-.843c2.347 0 4.695.063 7.046.067a.424.424 0 0 1 0 .844"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="m6.649 10.913-.034-.034.026.022c-.022 0-.06-.041-.082-.052h-.042.045l-.082-.027-.105-.022h-.049.049-.176c-.304 0-.608.026-.908.045a.42.42 0 0 1-.416-.431.43.43 0 0 1 .42-.424c.652-.045 1.44-.176 1.957.326a.42.42 0 0 1 0 .596.427.427 0 0 1-.596 0z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M5.625 10.665a20 20 0 0 0-2.126 3.443.424.424 0 0 1-.574.15.435.435 0 0 1-.154-.578 19.7 19.7 0 0 1 2.104-3.439.44.44 0 0 1 .577-.153c.199.12.265.376.15.577z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M3.191 13.631H4.59a.424.424 0 1 1 0 .844H3.191a.424.424 0 1 1 0-.844"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M4.946 14.344a8.4 8.4 0 0 0-1.256 3.491.44.44 0 0 1-.424.424.424.424 0 0 1-.42-.424A9.3 9.3 0 0 1 4.22 13.92c.281-.457 1.031-.045.727.424M9.75 14.479l-.398-2.033a.424.424 0 0 1 .814-.225l.39 2.029a.424.424 0 1 1-.813.225z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M9.889 11.914h4.777a.424.424 0 0 1 0 .844H9.89a.424.424 0 0 1 0-.844M14.404 16.238a2.97 2.97 0 0 1 2.25 2.073c.326 1.061.15 2.363-.874 2.97a2.54 2.54 0 0 1-2.932-.375 3 3 0 0 1-1.02-2.838 2.284 2.284 0 0 1 2.55-1.774.424.424 0 0 1 .296.517.435.435 0 0 1-.521.297 1.43 1.43 0 0 0-1.46.986 2.09 2.09 0 0 0 .545 2.021 1.79 1.79 0 0 0 1.942.544c.75-.319.881-1.163.72-1.875a2.16 2.16 0 0 0-1.714-1.703.42.42 0 0 1-.311-.547.43.43 0 0 1 .518-.296z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M17.066 17.1c-.588-1.343-2.13-1.77-3.487-1.545s-2.599 1.148-2.809 2.587c-.079.537-.893.308-.814-.224.259-1.755 1.834-2.944 3.518-3.195 1.684-.252 3.592.296 4.32 1.953.217.492-.51.923-.728.424M8.94 18.023c.291.683.335 1.447.124 2.16a2.09 2.09 0 0 1-1.309 1.29c-1.256.457-2.648-.375-3.236-1.478a2.84 2.84 0 0 1-.248-2.141c.158-.518.975-.296.814.225a2.18 2.18 0 0 0 1.695 2.659 1.39 1.39 0 0 0 1.339-.522c.375-.551.247-1.387 0-1.969a.424.424 0 0 1 .296-.517.43.43 0 0 1 .517.293zM14.786 8.884c.083.615.214 1.222.308 1.833.109.705.12 1.527.457 2.168.143.266.518.251.784.281.375.041.75.064 1.151.075.791 0 1.579 0 2.37-.052.54-.027.54.817 0 .844-.877.04-1.755.082-2.625.045-.424 0-.844-.06-1.264-.117a1.41 1.41 0 0 1-.993-.442c-.495-.604-.544-1.549-.645-2.292-.102-.742-.252-1.41-.349-2.118a.435.435 0 0 1 .27-.518c.223-.06.454.07.518.293z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M19.973 13.155c.112.041.022.03.04 0a.6.6 0 0 0 .057-.187 3 3 0 0 0 0-.657c-.026-.424-.116-.84-.184-1.256-.108-.697-.213-1.395-.375-2.089-.108-.528.705-.75.814-.225.191.904.315 1.819.469 2.726.11.538.137 1.09.078 1.635-.075.537-.543 1.107-1.125.874a.435.435 0 0 1-.296-.517.424.424 0 0 1 .518-.296z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M19.549 8.974a1.3 1.3 0 0 0-.229-.521c-.154-.177-.375-.147-.593-.15H16.95q-.823-.045-1.646 0c-.544.06-.484.633-.454 1.057.041.544-.803.54-.844 0-.049-.667.03-1.447.72-1.766.296-.115.614-.163.93-.143h1.185c.75 0 1.538-.056 2.284.023s1.065.645 1.238 1.278a.424.424 0 0 1-.814.222M17.153 16.673a3 3 0 0 0 0-.717l-.034-.341c0-.12-.023-.221-.034-.308a4.5 4.5 0 0 0-.15-.67 2.2 2.2 0 0 0-.285-.575.424.424 0 1 1 .728-.427c.289.453.47.966.528 1.5.113.582.135 1.178.068 1.766a.424.424 0 0 1-.518.297.435.435 0 0 1-.296-.522zM14.584 19.215l-.034.034a.3.3 0 0 1-.139.086.33.33 0 0 1-.161.037.34.34 0 0 1-.161-.037.3.3 0 0 1-.135-.086l-.079-.086a.4.4 0 0 1-.056-.214v-.109a.4.4 0 0 1 .108-.187l.034-.034a.33.33 0 0 1 .135-.09.3.3 0 0 1 .162-.034.3.3 0 0 1 .165.034q.078.028.134.09l.064.082a.4.4 0 0 1 .06.214v.113a.45.45 0 0 1-.108.187zM6.78 19.406a.424.424 0 0 1 0-.843.424.424 0 0 1 0 .843M8.745 15a6 6 0 0 0-.401.431.3.3 0 0 1-.135.087.3.3 0 0 1-.161.037.3.3 0 0 1-.165-.037.3.3 0 0 1-.135-.087.42.42 0 0 1-.124-.296v-.112a.4.4 0 0 1 .109-.188q.189-.225.4-.431a.3.3 0 0 1 .136-.086.376.376 0 0 1 .326 0 .3.3 0 0 1 .135.086.45.45 0 0 1 .124.3v.112a.44.44 0 0 1-.109.184M8.7 4.451a2.28 2.28 0 0 1 1.08-1.71 2.57 2.57 0 0 1 1.845-.296 2.72 2.72 0 0 1 1.553 1.001 2.34 2.34 0 0 1 .468 1.647 3.46 3.46 0 0 1-.716 1.875.375.375 0 0 1-.532 0 .375.375 0 0 1 0-.533c.325-.443.504-.977.51-1.526a1.67 1.67 0 0 0-.672-1.376 1.88 1.88 0 0 0-1.609-.357 1.54 1.54 0 0 0-1.185 1.26.375.375 0 1 1-.75 0z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M9.075 4.219c.33 0 .66.026.99.056q.24 0 .484.045l.229.026h.168c-.048 0-.056 0 0 0a.375.375 0 0 1 .203.724 1.1 1.1 0 0 1-.51 0l-.521-.053a24 24 0 0 0-1.028-.056.375.375 0 0 1 0-.75z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M11.4 4.961q-.12.407-.33.776a.375.375 0 0 1-.514.135.38.38 0 0 1-.172-.22.4.4 0 0 1 .037-.293q.097-.165.169-.341l-.037.09a3 3 0 0 0 .123-.345.375.375 0 1 1 .724.199"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="m10.631 6.15-1.5.026a.375.375 0 1 1 0-.75l1.5-.026a.375.375 0 0 1 0 .75M12.596 7.208H9.851a.375.375 0 1 1 0-.75h2.745a.375.375 0 0 1 0 .75"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M9.375 5.678c.188.333.375.66.6.974a.375.375 0 0 1-.649.38 12 12 0 0 1-.596-.976.375.375 0 0 1 .416-.553.38.38 0 0 1 .229.175M12.75 7.103c.232.915.776 1.702 1.061 2.598a2.93 2.93 0 0 1-.184 2.486c-.262.402-.91.027-.648-.374.42-.646.289-1.44.034-2.123-.3-.81-.773-1.541-.987-2.385a.376.376 0 0 1 .724-.202M11.209 6.994q.045.165.056.337.015.126 0 .251a.3.3 0 0 1-.03.143.35.35 0 0 1-.199.199.3.3 0 0 1-.146.033.38.38 0 0 1-.263-.112.35.35 0 0 1-.112-.263 1.7 1.7 0 0 0 0-.307v.097a2 2 0 0 0-.034-.18.375.375 0 0 1 .544-.425c.087.05.15.13.176.227z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M10.796 8.198c-1.33.15-2.674.15-4.005 0a.375.375 0 1 1 0-.75c1.331.15 2.674.15 4.005 0a.375.375 0 1 1 0 .75"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M6.375 8.044c-.037-.019-.034-.019 0 0h-.184c-.079 0 .072-.023 0 0l-.101.03c-.041 0-.034 0 0 0l-.049.026-.079.049c-.022 0 0 0 .023-.019l-.038.037s-.067.053-.07.075c.03-.04.033-.045 0 0l-.027.045a1 1 0 0 0-.041.068l-.023.049c0 .037 0 .03 0 0a.5.5 0 0 0-.056.195.2.2 0 0 1 0 .041c0-.049 0-.053 0 0v.18q0-.075 0 0l.022.086c0 .041 0 .038 0 0q.012.024.027.045l.026.041c.022.034.019.027 0 0-.019-.026.06.064.071.075h.019c.03.027.026.023-.019 0q.076.073.176.102c-.048-.019-.052-.023 0 0h.03s.143.045.042 0q.06.015.12 0c-.053 0-.056 0 0 0H6.3h-.034.034c.034-.023.03 0 0 0l.038-.034c.026-.03.022-.026 0 0l.026-.045q-.034.079 0 .023v.026a.375.375 0 0 1 .75 0 .78.78 0 0 1-.248.532.9.9 0 0 1-.566.233c-.362.01-.71-.141-.949-.413A1.24 1.24 0 0 1 5.1 8.408c.046-.355.224-.679.499-.908a1.13 1.13 0 0 1 1.151-.105.375.375 0 1 1-.379.649z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M6.75 8.719a61 61 0 0 0 3.637.199.375.375 0 0 1 0 .75 61 61 0 0 1-3.637-.2.375.375 0 1 1 0-.75"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M10.793 9.338q.108.484.157.978a.375.375 0 0 1-.637.266l-.06-.075a.4.4 0 0 1-.053-.19c0-.072 0-.147-.026-.222v.101a7 7 0 0 0-.12-.66.4.4 0 0 1 .037-.288.4.4 0 0 1 .225-.173c.098-.024.2-.01.289.038.085.049.147.13.172.225z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M10.654 10.706q-.924.282-1.785.72c-.086.045-.218.094-.259.188a.65.65 0 0 0 .038.315q.06.27.112.54c.169.836.3 1.691.544 2.508a.376.376 0 1 1-.724.203c-.274-.922-.409-1.875-.604-2.82a2.7 2.7 0 0 1-.101-.769.97.97 0 0 1 .54-.75 10.7 10.7 0 0 1 2.055-.843c.461-.143.66.58.199.723z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M10.631 14.43c.116.298.15.622.098.938-.12.397-.514.495-.878.532q-.435.03-.87 0l-.945-.041a.424.424 0 0 1 0-.844c.506.022 1.009.06 1.5.06h.255c.06 0 .116-.03.173-.034s-.045.03 0 0-.027.03-.034.038c-.008.007-.056.112-.034.108v-.074c0-.057 0 0 0 0a.3.3 0 0 0 0-.075 8 8 0 0 0-.09-.394.424.424 0 1 1 .814-.225zM6.544 10.676a6 6 0 0 0-.218-.622l.041.101c-.052-.124-.108-.244-.168-.375a.45.45 0 0 1-.045-.326.427.427 0 0 1 .521-.296c.106.03.196.1.251.194q.266.524.431 1.088a.424.424 0 0 1-.292.521.435.435 0 0 1-.521-.296z"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="m5.149 9.998.097-.113-.067.086q.158-.207.262-.446l-.045.101q.049-.111.083-.228a.46.46 0 0 1 .191-.252.43.43 0 0 1 .326-.041.42.42 0 0 1 .297.518 2.5 2.5 0 0 1-.544.97.427.427 0 0 1-.6 0 .44.44 0 0 1-.124-.3.5.5 0 0 1 .124-.295"
                        ></path>
                        <path
                          fill="#0A3847"
                          d="M6.083 10.204a.424.424 0 0 1 0-.844.424.424 0 0 1 0 .844M13.481 11.625a6.05 6.05 0 0 1-3-.99c-.3-.203 0-.69.281-.487.811.543 1.753.858 2.727.915.375.022.375.585 0 .562zM21.673 19.63h-3.028c-.224 0-.406-.215-.406-.48 0-.266.182-.48.406-.48h3.028c.225 0 .406.214.406.48 0 .265-.181.48-.406.48M22.655 16.75h-1.152c-.212 0-.384-.216-.384-.48 0-.266.172-.48.384-.48h1.152c.212 0 .384.214.384.48 0 .264-.172.48-.384.48"
                        ></path>
                      </svg>
                      <div> הצטרפו לצוות שלחי תן ביס</div>
                    </div>
                    <DropdownMenuSeparator />
                  </DropdownMenuItem>
                </Link>
              )}
              {role === "restaurant_owner" && (
                <Link
                  to="/edit-restaurant"
                  state={{ backgroundLocation: location }}
                >
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div>עריכת פרטי מסעדה</div>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span onClick={handleLogOut}>יציאה</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LogInModal rolee="login" isHomePage={true} />
      )}
    </div>
  );
};

export default UserMenu;
