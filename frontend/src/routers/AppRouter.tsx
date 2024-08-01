import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Toaster } from "sonner";
import { ErrorPage } from "../pages/NotFound/ErrorPage";
import { LoginPage } from "../pages/Login/Login";
import { Onboarding } from "../pages/OnBoarding/OnBoarding";
import { AuthContextProvider } from "../Context/AuthContext";
import { RoutesWithNotFound } from "./RoutesWithNotFound";
import { PublicRoute } from "./PublicRoute";
import { Home } from "../pages/private/Medic_Pages/Home/Home";
import { UserInfo } from "../pages/private/Medic_Pages/UserInfo/UserInfo";
import { RegisterPatient } from "../pages/private/Medic_Pages/RegisterPatient/RegisterPatient";
import PatientList from "../pages/private/Medic_Pages/PatientsList/PatientList";
import PatientDetail from "../pages/private/Medic_Pages/Patient-Detail/PatientDetail";
import { TreatmentPatient } from "../pages/private/Medic_Pages/Treatment/Treatment-patient";
import { Home_Patients } from "../pages/private/Patients_Pages/Home/Home_Patients";
// import DeviceDetection from "../pages/DeviceDetection/DeviceDetection";
import { PatientAppointments } from "../pages/private/Patients_Pages/Patient_Appointments/PatientAppointments";
import { Medic_Appointment } from "../pages/private/Patients_Pages/Medic_Appointment/Medic_Appointment";
import Donations from "../pages/private/Medic_Pages/Donations/Donations";
import Chat from "../pages/private/Patients_Pages/Chat-Cora/Chat";
import SignUp from "../pages/SignUp/SignUp";
import { Landing } from "../pages/Landing/Landing";
import { ActiveAccount } from "../pages/Active-account/ActiveAccount";
import { ProfilePatient } from "../pages/private/Patients_Pages/Profile/ProfilePatient";
import TreatementPatient from "../pages/private/Patients_Pages/Treatement/TreatementPatient";
import History from "../pages/private/Patients_Pages/HistoryClinic/History";
import { Patient_Notification } from "../pages/private/Patients_Pages/Notification/Patient_Notification";
import Statistics from "../pages/private/Medic_Pages/Statistics/Statistics";



function AppRouter() {

	return (
		<>
			<AuthContextProvider>
				<BrowserRouter>
					<RoutesWithNotFound>
						<Route element={<PublicRoute />}>
							{/* <Route element={<DeviceDetection />} > */}
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/onboarding" element={<Onboarding />} />
						</Route>
						{/* </Route> */}
						<Route index path="/" element={<Landing />} />
						<Route path="/active-account" element={<ActiveAccount />}></Route>
						<Route element={<PrivateRoute allowedRoles={["ROLE_MEDICO"]} />}>
							<Route path="/dashboard" index element={<Home />} />
							<Route path="/userInfo" element={<UserInfo />} />
							<Route path="/patient-register" element={<RegisterPatient />}></Route>
							<Route path="/patient-list" element={<PatientList />}></Route>
							<Route path="/patient/:id" element={<PatientDetail />} />
							<Route path="/patient/:id/statistics" element={<Statistics />} />
							<Route path="/patient/:id/treatment" element={<TreatmentPatient />}/>
							<Route path="/donations" element={<Donations />} />
						</Route>
						<Route element={<PrivateRoute allowedRoles={["ROLE_PACIENTE"]} />}>
							<Route path="/patient-home" element={<Home_Patients />} />
							<Route path="/profile" element={<ProfilePatient />}/>
							<Route path="/treatement" element={<TreatementPatient />}/>
							<Route path="/history" element={<History/>}/>
							<Route path="/chat-cora" element={<Chat></Chat>}></Route>
							<Route path="/notification" element={<Patient_Notification />}/>
							<Route path="/citas" element={<PatientAppointments />} />
							<Route path="/Medic_Appointment" element={<Medic_Appointment />}/>
						</Route>
						<Route path="*" element={<ErrorPage />} />

					</RoutesWithNotFound>
				</BrowserRouter>
			</AuthContextProvider >
			<Toaster richColors ></Toaster>
		</>
	);
}

export default AppRouter;