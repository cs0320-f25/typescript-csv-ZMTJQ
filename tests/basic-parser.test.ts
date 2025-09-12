import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import z from 'zod'

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const NAME_WITH_COMMAS_CSV_PATH = path.join(__dirname, "../data/name_with_commas.csv");
const GOOD_PARSE_CSV_PATH = path.join(__dirname, "../data/good_parse_test.csv");
const EMPTY_COLUMN_CSV_PATH = path.join(__dirname, "../data/empty_column_test.csv");
const DOUBLE_QUOTES_CSV_PATH = path.join(__dirname, "../data/double_quotes.csv");
const END_COMMA_CSV_PATH = path.join(__dirname, "../data/ending_comma.csv");
const NEWLINE_CSV_PATH = path.join(__dirname, "../data/newline.csv");
const QUOTE_NEWLINE_CSV_PATH = path.join(__dirname, "../data/quote_newline.csv");
const THOUSAND_CSV_PATH = path.join(__dirname, "../data/thousand.csv");
const LEADING_WS_CSV_PATH = path.join(__dirname, "../data/leading.csv");
const ENDING_WS_CSV_PATH = path.join(__dirname, "../data/ending.csv");
const COMMA_IN_DQ_CSV_PATH = path.join(__dirname, "../data/cdq.csv");
const STUDENTS_CSV_PATH = path.join(__dirname, "../data/students.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});


// /* ---------- Task A Tests ----------*/

// Test 1: tests if the parsing is "good," as described in the appendix
test("ensuring good parsing", async () => {
  const results = await parseCSV(GOOD_PARSE_CSV_PATH)
  
  //console.log(results)
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["Tim", "Nelson", "CSCI 0320", "instructor"]);
  expect(results[1]).toEqual(["Nim", "Telson", "CSCI 0320", "student"]); 
});

// Test 2: confirms if the parsing is NOT "bad," as described in the appendix
test("ensuring NOT bad parsing", async () => {
  const results = await parseCSV(GOOD_PARSE_CSV_PATH)
  
  //console.log(results)
  expect(results).not.toEqual([
    ["Tim, Nelson, CSCI 0320, instructor"],
    ["Nim, Telson, CSCI 0320, student"]]
  );
});

// Test 3: tests if the parse function can handle names with commas
test("handles name with commas in csv", async () => {
  const results = await parseCSV(NAME_WITH_COMMAS_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["name", "age", "email"]);
  expect(results[1]).toEqual(["the man, testing comma, comma man", "25", "the_man@brown.edu"]); 
});

// Test 4: tests if the parse function can handle names with commas
test("handles column missing in csv", async () => {
  const results = await parseCSV(EMPTY_COLUMN_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["Zach","", "CSCI 0320", "Student"]);
});

// Test 5: tests if parse function can handle names with double quotes
test("handles double quotes in csv", async () => {
  const results = await parseCSV(DOUBLE_QUOTES_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(['Milos "MJ" Janjic', "20", "CS320"]); 
});

// Test 6: tests if ending comma is caught correctly
test("handles ending comma in csv", async () => {
  const results = await parseCSV(END_COMMA_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["Zach", "Quitkin", "2023",""]); 
});

// Test 7: tests if parse function can handle a newline separating data lines
test("handles newline in csv", async () => {
  const results = await parseCSV(NEWLINE_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["Zach", "Quitkin", "2023"]);
  expect(results[1]).toEqual(["Z_lined", "Q", "2023"]);  
});

// Test 8: tests if parse can handle a newline splitting name across lines
test("handles newline in quotes in csv", async () => {
  const results = await parseCSV(QUOTE_NEWLINE_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["I am on two lines", "2022", "2020"]);
});

// Test 9: tests if parse can handle the number "1,000"
test("handles number 1,000 written in csv", async () => {
  const results = await parseCSV(THOUSAND_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["Number", "1,000"]);
});

// Test 10: tests if parse can handle leading whitespace 
test("handles leading whitespace in csv", async () => {
  const results = await parseCSV(LEADING_WS_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["Zach", "Quitkin"]);
});

// Test 11: tests if parse can handle ending whitespace 
test("handles ending whitespace in csv", async () => {
  const results = await parseCSV(ENDING_WS_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(["Zach", "Quitkin"]);
});

// Test 12: tests if parse can handle commas in double quotes
test("handles commas in double quotes in csv", async () => {
  const results = await parseCSV(COMMA_IN_DQ_CSV_PATH)
  
  //console.log(results)
  expect(results[0]).toEqual(['Nah Nah Nah Nah "hey, hey, hey" goodbye']);
});



