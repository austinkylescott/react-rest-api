import config from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api("/courses", "GET");

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async getCourse(courseID) {
    const response = await this.api(`/courses/${courseID}`, "GET");

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async updateCourse(course, username, password) {
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      { username, password }
    );

    if (response.status === 204) {
      //If successful, return empty array (ie. no messages)
      return [];
    } else if (response.status === 401) {
      //If 401, user is unauthorized
      this.props.history("/forbidden");
      return null;
    } else if (response.status === 400 || response.status === 403) {
      //If 400 (general error) or 403 (user doesn't own course), return error message
      return response.json().then(data => {
        return data.message;
      });
    } else {
      //Anything else is a new error
      throw new Error();
    }
  }

  async createCourse(course, username, password) {
    const response = await this.api(`/courses`, "POST", course, true, {
      username,
      password
    });

    if (response.status === 201) {
      //If successful, return empty array (ie. no messages)
      return [];
    } else if (response.status === 401) {
      //If 401, user is unauthorized
      this.props.history("/forbidden");
      return null;
    } else if (response.status === 400) {
      //If 400 (general error)
      return response.json().then(data => data);
    } else {
      //Anything else is a new error
      throw new Error();
    }
  }

  async deleteCourse(courseID, username, password) {
    const response = await this.api(
      `/courses/${courseID}`,
      "DELETE",
      null,
      true,
      { username, password }
    );

    if (response.status === 204) {
      //If successful, return empty array (ie. no messages)
      return [];
    } else if (response.status === 401) {
      //If 401, user is not signed in
      this.props.history("/forbidden");
      return null;
    } else if (response.status === 400 || response.status === 403) {
      //If 400 (general error) or 403 (user doesn't own course), return error message
      return response.json().then(data => data);
    } else {
      //Anything else is a new error
      throw new Error();
    }
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password
    });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    } else {
      throw new Error();
    }
  }
}
