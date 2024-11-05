import { ErrorsType, Profile } from "./types";

const URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token logic
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Refresh token request
        const refreshResponse = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          { refresh: refreshToken }
        );
        const { access } = refreshResponse.data;

        // Save new token and retry original request
        localStorage.setItem("token", access);
        api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // Optionally: redirect to login or clear authentication state
      }
    }

    return Promise.reject(error);
  }
);
export const applayForInternship = async (data: any) => {
  try {
    const response = await api.post("/internship-application/", data)
  
    return response
  } catch(error) {
    console.log('error when creating Application', error);
    throw error;
  }
}
export const getInternsData = async (status: string = "all") => {
  try {
    const response = await api.get("/internship-application/", {
      params: status !== "all" ? { status } : {},
    });
    return response;
  } catch (error) {
    console.error("Error fetching interns data:", error);
    throw error; // Rethrow error for handling in the component
  }
};
export const updateInternsStatus = async (
  applicationId: number,
  newStatus: string
) => {
  try {
    const response = await api.patch(
      `/internship-applications/${applicationId}/status/`,
      {
        status: newStatus,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};
export const deleteInterns = async (deleteId: number) => {
  try {
    await api.delete(`/internship-application/${deleteId}/`);
   
  } catch (error) {
    console.error("Error deleting work area:", error);
    throw error;
  }
};
export const addWorkArea = async (internship: any) => {
  const response = await api.post("/internships/", internship);
  return response.data;
};

export const getWorkAreaData = async () => {
  const response = await api.get("/internships/");
  return response;
};
export const deleteWorkArea = async (deleteId: number) => {
  const response = await api.delete(`/internships/${deleteId}/`);
  return response;
};
export const updateWorkStatus = async (id: number, isActive: boolean) => {
  const response = await api.patch(`/internships/${id}/status/`, {
    is_active: isActive,
  });
  return response;
};

export const getQuestions = async () => {
  const response = await api.get("/get-questions/");
  return response;
};
export const submitQuesionsAnswer = async (answers: any) => {
  const response = await api.post("/submit-answers/", answers);
  return response;
};
export const getAnswerSubmissions = async () => {
  
  const response = api.get("/review-answers/");
  return response
}
export const UpdateAnswerFeedback = async (id:number,feedback:string) => {
  const response = api.patch(`/review-answers/${id}/`,
    { admin_feedback: feedback},
  );
  return response
}
export const answerStatusChange = async (id: number, newStatus: string) => {
  const response = api.patch(`/review-answers/${id}/`,
    { review_status: newStatus },
  );
  return response
}
export const getTopScorers = async () => {
  return await api.get('/top-scorers/');
};


export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/token/", data);
  const { refresh, access } = response.data;
  // Store tokens in localStorage
  localStorage.setItem("token", access);
  localStorage.setItem("refreshToken", refresh);
  return response;
};
export const updatePassword = async ( email:string, newPassword:string ) => {
  const response = await api.post('/accounts/reset-password/', {
      email,
      new_password: newPassword,
  });
  return response.data;
};

// Define the register function
export const register = async (data: {
    email: string;
    password: string;
    username: string;
   
}) => {
    try {
        const response = await api.post('/accounts/register/', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const  errors = error.response?.data || {};
            // Collect error messages for all fields
            const errorMessages: ErrorsType = {};
            if (errors.username) {
                errorMessages.username = errors.username.join(', ');
            }
            if (errors.email) {
                errorMessages.email = errors.email.join(', ');
            }
            if (errors.password) {
                errorMessages.password = errors.password.join(', ');
            }
            throw errorMessages; // Throw the collected errors
        }
        throw new Error('An unexpected error occurred');
    }
    }





export const refreshToken = (refreshToken: string) => api.post('/token/refresh/', { refresh: refreshToken });
export const getInternships = () => api.get('/internships/');
export const getMCQs = () => api.get('/mcqquestions/');
export const getMCQ = (id: number) => api.get(`/mcqquestions/${id}/`);
export const getShortQ = (id: number) =>
  api.get(`/shortanswerquestions/${id}/`);
export const getShortQs = () => api.get("/shortanswerquestions/");
export const getProfile = () => api.get("/accounts/profiles/");
import axios from "axios";

// Assuming updatedProfile contains the updated fields for both user and profile
export const updateProfile = async (updatedProfile: Profile) => {
    try {
        // Update Profile fields
        await api.patch(`/accounts/profiles/${updatedProfile.id}/`, {
            bio: updatedProfile.bio,
            // avatar: updatedProfile.avatar,
        });

        console.log(updatedProfile.bio);

        // Update User fields separately (if needed)
        await api.patch(`/accounts/users/${updatedProfile.user.id}/`, {
            username: updatedProfile.user.username,
            first_name: updatedProfile.user.first_name,
            last_name: updatedProfile.user.last_name,
        });

        console.log("Profile and User updated successfully.");
    } catch (error) {
        console.error("Error updating profile and user");
    }
};

export const applyForInternship = (id: number, data: any, token: string) => {
  return api.post(`/internships/${id}/apply/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createMCQQuestion = async (data: any) => {
  try {
    const response = await api.post("/mcqquestions/", data);
    return response;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

export const createShortAnswerQuestion = async (data: any) => {
  try {
    const response = await api.post("shortanswerquestions/", data);
    return response;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

export const updateMCQQuestion = async (id: number, data: any) => {
  try {
    const response = await api.put(`/mcqquestions/${id}/`, data);
    return response;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const updateShortAnswerQuestion = async (id: number, data: any) => {
  try {
    const response = await api.put(`/shortanswerquestions/${id}/`, data);
    return response;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export default api;
