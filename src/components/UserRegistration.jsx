import { useState } from "react";

const hobbies = [
  {
    value: "music",
    name: "Music",
  },
  {
    value: "movie",
    name: "Movies",
  },
  {
    value: "plastic-model",
    name: "Plastic Model",
  },
];

const genders = [
  {
    value: "male",
    name: "Male",
  },
  {
    value: "female",
    name: "Female",
  },
  {
    value: "others",
    name: "Others",
  },
];

const departmentPositions = {
  it: {
    name: "IT",
    positions: [
      "Frontend Developer",
      "Backend Developer",
      "System Administrator",
    ],
  },
  marketing: {
    name: "Marketing",
    positions: [
      "Marketing Executive",
      "Content Creator",
      "Digital Marketing Specialist",
    ],
  },
  finance: {
    name: "Finance",
    positions: ["Accountant", "Financial Analyst", "Finance Officer"],
  },
  humanResources: {
    name: "Human Resources",
    positions: ["HR Officer", "Recruiter", "Training Coordinator"],
  },
};

const initialFormData = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  gender: "",
  department: "",
  position: "",
  hobbies: [],
};

function UserRegistration() {
  const [formData, setFormData] = useState(initialFormData);
  const [submittedData, setSubmittedData] = useState(null);
  const [hobbyError, setHobbyError] = useState("");

  const selectedDepartment = departmentPositions[formData.department];
  const selectedPositions = selectedDepartment?.positions || [];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
      ...(name === "department" ? { position: "" } : {}),
    }));
  };

  const handleHobbyChange = (event) => {
    const { value, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      hobbies: checked
        ? [...currentData.hobbies, value]
        : currentData.hobbies.filter((hobby) => hobby !== value),
    }));
    setHobbyError("");
  };

  const getHobbyNames = (values) =>
    values
      .map((value) => hobbies.find((hobby) => hobby.value === value)?.name)
      .filter(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.hobbies.length === 0) {
      setHobbyError("Please select at least one hobby.");
      return;
    }

    setSubmittedData({
      ...formData,
      fullName: `${formData.firstname} ${formData.lastname}`.trim(),
      departmentName: departmentPositions[formData.department]?.name || "",
      hobbyNames: getHobbyNames(formData.hobbies),
    });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSubmittedData(null);
    setHobbyError("");
  };

  return (
    <main className="registration-page">
      <header className="panel">
        <h1 className="page-title">User Registration</h1>
        <p className="page-subtitle">Complete the form and submit your details.</p>
      </header>

      <form className="panel form-panel" onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <fieldset className="option-group">
            <legend>Gender</legend>
            <div className="option-list">
              {genders.map((gender) => (
                <label key={gender.value} className="option">
                  <input
                    type="radio"
                    name="gender"
                    value={gender.value}
                    checked={formData.gender === gender.value}
                    onChange={handleChange}
                    required
                  />
                  {gender.name}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="option-group">
            <legend>Hobbies</legend>
            <div className="option-list">
              {hobbies.map((hobby) => (
                <label key={hobby.value} className="option">
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={hobby.value}
                    checked={formData.hobbies.includes(hobby.value)}
                    onChange={handleHobbyChange}
                  />
                  {hobby.name}
                </label>
              ))}
            </div>
            {hobbyError && <p className="error">{hobbyError}</p>}
          </fieldset>

          <div className="form-field">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select a department</option>
              {Object.entries(departmentPositions).map(([value, department]) => (
                <option key={value} value={value}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="position">Job Position</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              disabled={!formData.department}
              required
            >
              <option value="">Select a job position</option>
              {selectedPositions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="reset" className="button button-secondary">
            Reset
          </button>
          <button type="submit" className="button button-primary">
            Submit
          </button>
        </div>
      </form>

      {submittedData && (
        <section className="panel" aria-labelledby="submitted-title">
          <h2 id="submitted-title" className="section-title">
            Submitted Information
          </h2>
          <dl className="summary">
            <dt>Username</dt>
            <dd>{submittedData.username}</dd>

            <dt>Full name</dt>
            <dd>{submittedData.fullName}</dd>

            <dt>Email</dt>
            <dd>{submittedData.email}</dd>

            <dt>Gender</dt>
            <dd>
              {genders.find((gender) => gender.value === submittedData.gender)
                ?.name || submittedData.gender}
            </dd>

            <dt>Department</dt>
            <dd>{submittedData.departmentName}</dd>

            <dt>Job position</dt>
            <dd>{submittedData.position}</dd>

            <dt>Hobbies</dt>
            <dd>{submittedData.hobbyNames.join(", ")}</dd>
          </dl>
        </section>
      )}
    </main>
  );
}

export default UserRegistration;
