import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Rating from "./Rating";
import ReviewCard from "./ReviewCard";
import RestaurantCard from "./RestaurantCard";

it("is calculates the average review correctly", () => {
  const sampleRatings = [{ rating: 1 }, { rating: 3 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("value").textContent).toBe("2.0");
});
//
it("is using the proper value for out of", () => {
  const sampleRatings = [{ rating: 1 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("outOf").textContent).toBe("10");
});

it("displaying a default message if no data is received", () => {
  const sampleRatings = [];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("value").textContent).toBe("No ratings yet");
});

it("displays the number of publications with ratings", () => {
  const sampleRatings = [{ rating: 1 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("from").textContent).toBe("1 publication");
});

it("includes an s at the end of publication if there are more than one", () => {
  const sampleRatings = [{ rating: 1 }, { rating: 1 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("from").textContent).toBe("2 publications");
});

it("passes through the proper dollar sign rating", () => {
  const sampleRatings = [{ rating: 1 }, { rating: 1 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      money="$$$$$$$"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("money").textContent).toBe("$$$$$$$");
});

it("passes through the text from the review content", () => {
  const { queryByTestId, getByTestId } = render(
    <ReviewCard
      publication="0"
      rating="8.6"
      review="Review body"
      url="https://google.com"
      image="image.png"
    />
  );
  expect(queryByTestId("reviewbody").textContent).toBe("Review body");
});

it("passes through the rating from the review content", () => {
  const { queryByTestId, getByTestId } = render(
    <ReviewCard
      publication="0"
      rating="8.6"
      review="Review body"
      url="https://google.com"
      image="image.png"
    />
  );
  expect(queryByTestId("ratingcard").textContent).toBe("8.6");
});

it("passes through the correct article link", () => {
  const { queryByTestId, getByTestId } = render(
    <ReviewCard
      publication="0"
      rating="8.6"
      review="Review body"
      url="https://google.com"
      image="image.png"
    />
  );
  expect(queryByTestId("articlelink")).toHaveAttribute(
    "href",
    "https://google.com"
  );
});

it("passes through the correct image link", () => {
  const { queryByTestId, getByTestId } = render(
    <ReviewCard
      publication="0"
      rating="8.6"
      review="Review body"
      url="https://google.com"
      image="image.png"
    />
  );
  expect(queryByTestId("src")).toHaveAttribute("src", "image.png");
});

it("passes through the correct background color", () => {
  const sampleRatings = [{ rating: 1 }, { rating: 3 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("background").textContent).toBe("#fff");
});

it("passes through the correct text color", () => {
  const sampleRatings = [{ rating: 1 }, { rating: 3 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("textcolor").textContent).toBe("#6665d2");
});

it("shows badge for not recommended restaurants", () => {
  const sampleRatings = [{ rating: 1 }, { rating: 3 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("recommend").textContent).toBe("Not recommended");
});

it("shows badge for recommended restaurants", () => {
  const sampleRatings = [{ rating: 10 }, { rating: 6 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("recommend").textContent).toBe("Recommended");
});

it("passes through correct background color for the recommend badge", () => {
  const sampleRatings = [{ rating: 10 }, { rating: 6 }];
  const { queryByTestId, getByTestId } = render(
    <Rating
      background="#fff"
      textColor="#6665d2"
      badgeColor="#000"
      outOf="10"
      ratings={sampleRatings}
    />
  );
  expect(queryByTestId("badgecolor").textContent).toBe("#000");
});
