# Sprint 1: TypeScript CSV

## Task B: Proposing Enhancement

### Step 1: Brainstorm on your own.
***Functionality Enhancements:***
  - Failed Tests:
    - 3. Handles names with commas
    - 5. Handles double quotes
    - 7. Handles newline
    - 8. Handles newline in quotes
    - 9. Handles “1,000”
    - 12. Handles commas in double quotes

From these tests, we see that the csv parser needs to properly handle:
   - 1. Things in quotations that have commas. For example, “hello, how are you”, 20 should be parsed as [“hello, how are you”, “20”]
   - 2. Newline processing. Should skip newlines that separate two data lines. Newlines in quotations should be ignored
   - 3. Double quote processing

***Extensibility Enhancements:***
   1. If inputting larger numbers that would normally have commas, have a way of identifying these.
   2. If a column is empty (and we somehow know it shouldn’t be, like from a header), notify the user of that
   3. If there is an issue with quotes matching (double or single), report that
   
-------------------------------------------------------------------------------------------------------------------------------------------------------


### Step 2: Use an LLM to help expand your perspective.

*Prompt 1:*  

“I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?”

*Response: 1*
   - Functionality 
      - Quoted Fields: Handle commas, newlines, and escaped quotes inside double-quoted fields (e.g., "a, b", "c""d"). 
         - Feedback: I also thought of this
      - Custom Delimiters: Support delimiters other than commas (e.g., tabs, semicolons).
         - Feedback: Did not think of this 
      - Header Row Detection: Optionally treat the first row as column headers and return objects instead of arrays.
         - Feedback: Sprint documentation/in class mentioned this
      - Empty Fields: Correctly parse consecutive commas as empty fields.
         - Feedback: Already does that
      - Whitespace Handling: Trim whitespace only where appropriate (not inside quotes).
         - Feedback: I didn’t test for this
      - Line Endings: Support both \n and \r\n line endings.
         - Feedback: It does this already
      - Escaped Quotes: Handle escaped double quotes inside quoted fields ("" becomes ").
         - Feedback: I also thought of this
      - Malformed Rows: Gracefully handle rows with missing or extra columns.
         - Feedback: I also thought of this
      - Unicode/BOM: Handle files with a Byte Order Mark (BOM) or non-UTF-8 encodings.
         - Feedback: No idea what this is
      - Comments: Optionally skip lines starting with # or other comment markers.
         - Feedback: Hadn’t considered this
   - Extensibility: (all good suggestions)
      - Error Reporting: Give detailed errors for malformed CSV lines.
      - Configurable Options: Allow users to configure delimiter, quote character, header presence, etc.
      - Documentation: Add JSDoc comments and usage examples.
      - Validation: Integrate with schema validation libraries (like Zod) for row validation.


*Prompt 2:*

“I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. It's currently failing these tests and I've come up with these bugs: 

[I copy and pasted my response to "Step 1: Brainstorm on your own" here]

What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?”

<br>

*Response 2:*  (* means repeated LLM idea, in lieu of repeated feedback)
   - Missing Features / Edge Cases
       - *Escaped Quotes Inside Quoted Fields:CSV allows double quotes inside quoted fields by escaping them as "".
        Example: "He said ""hello""",25 → ["He said \"hello\"", "25"]
       -  *Empty Fields: Handle consecutive commas (,,) and trailing commas (,) as empty fields.
       -  *Whitespace Handling: Trim leading/trailing whitespace outside quotes, but preserve whitespace inside quoted fields.
       -  *Different Line Endings: Support both \n (Unix) and \r\n (Windows) line endings.
       - *Custom Delimiters: Allow parsing with delimiters other than commas (e.g., tabs, semicolons).
       -  *Header Row Support: Optionally parse the first row as headers and return objects instead of arrays.
       -  *Error Handling: Gracefully handle malformed CSV (unclosed quotes, inconsistent columns).
       - *Unicode/BOM Support: Handle files with Byte Order Mark (BOM) and Unicode characters.
       - Streaming/Large File Support: Allow parsing large files without loading the entire file into memory.
   - Improvements for Developer Usability
       - *Configurable Options:Allow users to specify delimiter, quote character, escape character, and whether to trim whitespace.
       -  *Typed Output: Option to return rows as objects (with keys from header row) or arrays.
       - *Documentation & Examples: Provide clear docs and usage examples.
       - TypeScript Types: Export types/interfaces for parsed rows.
       - Async/Sync APIs: Support both synchronous and asynchronous parsing.


*Notes: not much change from the first response.*

<br>

*Prompt 3:*
    
"I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. I'm told the following: 'Your goal is to generate a list of possible bugs, enhancements, or design limitations from two different categories:

Functionality: What might be broken or underspecified in the functionality, in terms of the CSV specification?
Extensibility: What could the function do better from the perspective of a caller? Think in terms of validation, error handling, what the caller might need to do with the function, etc.'

What do you recommend I try? give me the top 4 you think are the best total (not 4 from either category)"

<br>

*Response 3:* (My overall feedback is that this is nothing new, just a summary of the most important points from the first two responses)

1. Functionality: Robust Quoting and Escaping
   - Potential Issue: Handling of double quotes, escaped quotes (""), and commas inside quoted fields may be incomplete or buggy. Edge cases like nested quotes or multiline quoted fields can break parsing.
   - Recommendation: Ensure your parser fully supports RFC 4180 quoting rules, including escaped quotes and newlines inside quoted fields.
2. Functionality: Unicode and Encoding Support
   - Potential Issue: The parser may assume UTF-8 or ASCII encoding, but CSV files can use other encodings (e.g., UTF-16, Latin-1).
   - Recommendation: Allow the caller to specify file encoding, and handle BOMs and non-UTF-8 files gracefully.
3. Extensibility: Error Handling and Reporting
   - Potential Issue: If the CSV is malformed (e.g., uneven columns, unexpected EOF in quotes), the parser may fail silently or throw generic errors.
   - Recommendation: Provide detailed error messages and optionally return partial results with error info, so callers can handle or log parsing issues.
4. Extensibility: Flexible Output Formats
   - Potential Issue: The parser currently returns arrays; callers may want objects (using headers as keys), type coercion (numbers, booleans), or streaming for large files.
   - Recommendation: Support options for output format (array, object, typed), and consider async iterators or streams for memory efficiency.


*Notes: not much change from the first response.*

-------------------------------------------------------------------------------------------------------------------------------------------------------

### Step 3: use an LLM to help expand your perspective.

Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format

1. Functionality (Came from both me and LLM):
   - User Story: As the user of the CSV parser, I can enter data that has commas (like 1,000,000 or other large numbers) or data that has quotes. 
   - Acceptance Criteria:
      - If a user wants to input data with commas it must be surrounded by quotes
      - Data with quotes must also be surrounded by quotes, in addition to double quotes. Ex: [Hello “Hi”] should be entered as [“Hello ““Hi”” ”]

2. Extensibility (Came from both me and LLM): 
   - User Story: As a user of the CSV parser, I will be able to tell if and why my input CSV data causes errors/issues with the parser 
   - Acceptance Criteria:
      - The user will see an error message if there are inconsistent columns, quotes, etc
      - The user will either have to restart the parser, or look at past logs.

3. Extensibility (Came mostly from LLM): 
   - User Story: As a user, I will be able to receive custom output that I specify 
   - Acceptance Criteria:
      - The user will be able to include a header line which defines the output object type

4. Extensibility (Came mostly from LLM): 
   - User Story: As a user, I will be provided with detailed documentation on how to use the parser and what might cause errors.

<br>

*Note: These are my top 4, but after doing part C I realize 2 and 3 are somewhat dealt with in this Sprint. Here are two extra ones that could replace them in case this is an issue.*

5. Functionality (Came mostly from LLM but also lecture)
   - User Story: As a user of the CSV parser, I will be able delimit/separate data as I wish
   - Acceptance Criteria:
      - The user will be able to use characters other than "," to delimit data.

6. Functionality (Came from both me and LLM)
   - User Story: As a user of the CSV parser, I will be able leave empty rows or comments in my data to help me understand it or refresh myself (should I need to come back to it)
   - Acceptance Criteria:
      - The user will not be able to see these inconsequential additions in the parser's output data

<br>

*Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt?* *What resonated with you, and what didn’t? (3-5 sentences.)*

My initial functionality enhancements were to fix the bugs I discovered while testing, which were issues with quotes and commas, double quotes, and newlines. My initial extensibility ideas were largely error checking (i.e, how to report errors to the user). The LLM (Copilot) shared these ideas too, but raised a couple of really interesting extensibility enhancements. Despite the 3 different prompts, the results were largely the same (just differently worded or groups): Copilot suggested adding custom outputs like objects via header lines, documentation on how to use the parser, and proper error handling/validation (which I already thought of, albeit half-baked). As someone who coded in C a lot last year, proper, detailed documentation is really helpful (current JSDoc comment doesn't say much), as well as thorough error handling. As of right now I fail to see the benefit of returning objects vs strings from the parser, but I understand that it could be useful so I’ll try to implement that as well.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved

#### Errors/Bugs:
As of right now, I am not aware of any additional bugs that are not documented in Task B. I was having an issue with ZodErrors being a return type for a while, but I figured this out by reconfiguring my tests to check for instanceOf(z.ZodError(T)). Could potentially be an issue down the road, though.

#### Tests:
In basic-parser.tests.ts, I added 12 tests. Here is a brief summary of what their purposes are:
   - Test 1: This tests if the parsing is "good," as described in the appendix, using the example csv data in the appendix.
   - Test 2: This confirms if the parsing is NOT "bad," as described in the appendix. In otherwords, it confirms each row isn't one string.
   - Test 3: This tests if the parse function can handle names with commas, which it currently CANNOT.
   - Test 4: This tests if the parse function can handle empty columns.
   - Test 5: This tests if parse function can handle names with double quotes, which it currently CANNOT.
   - Test 6: This tests if ending comma is caught correctly.
   - Test 7: This tests if parse function can handle a newline separating data lines, which it currently CANNOT.
   - Test 8: This tests if parse can handle a newline splitting name across lines, which it currently CANNOT.
   - Test 9: This tests if parse can handle the number "1,000", which it currently CANNOT.
   - Test 10: This tests if parse can handle leading whitespace 
   - Test 11: This tests if parse can handle ending whitespace 
   - Test 12: This tests if parse can handle commas in double quotes, which it currently CANNOT.

In basic-parser-schema.tests.ts, I added 7 tests. Here is a brief summary of what their purposes are:
   - Test 1: This tests if the parse function can handle a simple, correctly schema-organized csv input to ensure that a schema can be passed in as a parameter
   - Test 2: This tests if the parse function returns an error when email field is bad in a csv row     
   - Test 3: This tests if the parse function returns an error when name field is bad in a csv row
   - Test 4: This tests if the parse function returns an error when credit field is bad in a csv row
   - Test 5: This tests if the parse function returns an error when a column is empty
   - Test 6: This tests if the parse function can handle a DIFFERENT, simple, correctly schema-organized csv input to ensure that a schema can be passed in as a parameter
   - Test 7: This tests if the parse function returns an error when an extra field is added to a csv row.


#### How To…
To run the tests, simply call "npm run test" from inside this repository. I have no additional instructions at this time.

#### Team members and contributions (include cs logins): 
Solo Project

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
I didn't really collab with anyone from the lecture. I used Copilot and ChatGPT for the conceptual questions and Typescript syntax.

#### Total estimated time it took to complete project:
11-12 hours
#### Link to GitHub Repo:
https://github.com/cs0320-f25/typescript-csv-ZMTJQ.git
