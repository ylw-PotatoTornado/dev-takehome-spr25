# Front-End 🎨

## Necessary Information

We will be building a front-end at `/admin` to manage the new database of item requests. Some tailwind presets have already been defined but feel free to restructure or add whatever is necessary.

If you are only doing the front-end portion, we have built a mock backend API for you to interface with. Note that because it is based on a mock database, some of the actions may not persist for longer than a minute or two. If you would like to test more concretely, edit `src/api/mock/data.ts` and the data will then persist.

If you are a full-stack dev doing both parts, link the front-end to the back-end you have created instead of the mock back-end.

All the front-end will be built off [this Figma file](https://www.figma.com/design/Vl6kE59WzDyll3IwdWeGJb/Developer-Take-Home-Designs). Feel free to use Figma dev mode to help you out!

We have specified some tasks as making components but that does not mean these are the only components you should be making.

The API endpoints are not guaranteed to produce successful responses so make sure you handle errors! The application should NEVER crash.

## Minimum Requirements

### Components

1. Build the Dropdown component in `src/components/atoms`. Use your discretion as to what props to give it. The existing components can serve as a helpful reference to decide how to structure the component.

2. Build the needed table component in `src/components/tables`. You do not need to worry about pagination or status tabs for now. However, try to make it responsive for mobile! Use your own discretion as to how to do that best.

### API Interactivity

3. Create the base item requests page. Data can be fetched using the API endpoint `GET api/mock/request`. Again, do not worry about pagination or status tabs. Some data may also not have a last edited date as it is optional- if this is the case, merely display the created date in that column.

4. Make the dropdowns in the status column interact with the backend appropriately using `PATCH api/mock/request` with a body in the format below:

```
{
    id: ________,
    status: approved
}
```

## Main Requirements

5. Add pagination to the table. The backend paginates using `GET api/mock/request?page=__`. There is a pagination component already created in `src/components/molecules/Pagination.tsx` that you can use. Place it appropriately and make it functional.

6. Add the tab functionality and appropriate interactions. You can get paginated item requests with a particular status using `GET api/mock/request?status=____&page=____`.

## Above and Beyond

7. Enable the front-end for batch edits and deletes of data. Do not worry about linking this to the back-end unless you have done the back-end Above and Beyond also.
