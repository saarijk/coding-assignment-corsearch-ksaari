# Coding Assignment for Corsearch / Frontend Developer - React & TypeScript

This project utilizes **Vite** for its simplicity, speed, and focus on front-end development. If the app is meant to grow into something more substantial that requires Server-Side Rendering (SSR) or API routes, **Next.js** would be a better long-term choice.

## API Integration

I examined the API's response structure and created types for **User**, **Address**, and **Company** within the `shared` directory of the project. This organization allows for easy access to type definitions, making it easier to expand the project with additional types or objects in the future.

### Data Fetching

I used **Axios** to retrieve data from the API. Axios is a simple library that facilitates easy data fetching.

## Search Functionality

I created a function to handle user input in the search bar:

- The `handleSearchInput` function is triggered when the user types in the search bar.
- It extracts the input value and stores it in the `searchTerm` state to track user input.

To optimize the search experience, I implemented a debouncing technique using `clearTimeout()` and `setTimeout()`. This ensures that the search operation only runs after the user stops typing for half a second.

### Filtering Results

- If the search bar is empty or cleared, the results are hidden, and the filtered data is cleared.
- If input exists, `users.filter()` checks if any properties of the **User** objects match the search term.

### Specified Fields for Search

I specified the following fields to search through:

- **name**
- **email**
- **phone**
- **website**
- **address.city**

Using the `getFieldValue` function, which employs a switch statement, I can retrieve the appropriate value from the user object based on the field name. The filtering is accomplished using the `filter()` method combined with the `some()` method, which checks if at least one field in each **User** object matches the search term.

This design allows for easy modification: if more fields need to be included in the search, they can simply be added to the array without altering the search logic.

### Storing Filtered Results

The found results are stored in the `filteredData` array. When the user clicks the button to clear the input, the `clearInput` function resets the `searchTerm`, hides the search results, and clears `filteredData`.

## Sorting Functionality

I also created a simple sorting function to order users by their **name** or **email** in ascending or descending order:

- Users can press a button that sets sorting via **name** or **email**
- The function also checks if a search is active to determine whether to reorder the search results.
- New arrays are created by copying the original array to avoid direct modification, and the `.sort()` method is used with `localeCompare()` to alphabetically compare two strings.
- Finally, the state of the arrays is updated to display the correct user data.

## Third-Party Libraries

Not many third-party libraries were used apart from **axios** to make data fetching easier, and **react-icons** to add some visual appeal to the application.
