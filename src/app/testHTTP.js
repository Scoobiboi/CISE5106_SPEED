export default async function testHTTP() {
  try {
    const response = await fetch("http://localhost:8080", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text(); // or response.text() for plain text

    // Handle the response data here
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
  }
}
