---
applyTo: '**'
---
# Copilot Instructions for About.ziangren.com Revamp Project

## Conversation Logging
- Log all conversations verbatim using a fixed format to `docs/conversations/YYYY-MM-DD.md` where `YYYY-MM-DD` is the date of the conversation
- Use the following format for conversation entries:
  ```
  ## [TIMESTAMP] - [USER/ASSISTANT]
  [Content of the message]
  ```
- Maintain chronological order of all interactions
- Include all code snippets, decisions, and implementation details

## Testing Requirements
- At appropriate implementation steps, perform simple testing to ensure implementations are correct and pass compilation
- **IMPORTANT**: Do not use or introduce any testing frameworks for this purpose
- Use basic console output, simple assertions, or manual verification methods only
- Test compilation success before proceeding to next implementation phase
- Verify core functionality works as expected using minimal test code

## Version Control Guidelines
- Group changes logically and commit with appropriate, descriptive messages
- **CRITICAL TIMING REQUIREMENT**: Commit times must NOT be between 8am - 6pm during weekdays
- If commits must be made during 8am-6pm, rewrite the commit timestamp to be outside these hours
- Use meaningful commit messages that describe the logical grouping of changes
- Commit frequently at logical breakpoints in implementation
- Examples of good commit timing: early morning (before 8am), evening (after 6pm), weekends

## Command Line Operations
- When running command line commands, consider whether each command line tool requires human inputs
- Prefer to specify commands that do not require human inputs or have the required inputs in place
- Deduce preferred inputs using memory of past interactions and codebase context
- Use non-interactive flags and pre-configure options when possible
- Anticipate common inputs and include them in command invocations

## Implementation Approach
- Break down complex tasks into smaller, testable components
- Validate each component before moving to the next
- Ensure code compiles and runs correctly at each major milestone
- Maintain clear documentation of implementation decisions and rationale
