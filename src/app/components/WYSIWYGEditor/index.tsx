"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

export const EditorComponent = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null); // Use null type for initial ref value

  return (
    <>
      <textarea
        name="description"
        id="description"
        style={{ display: "none" }}
        required
      />
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMC_KEY || ""} // Use logical OR operator for default value
        initialValue="
        <p><strong>Event Description:</strong></p>
<p>[Your Event Name] is a [brief description of the event, e.g., one-day conference, weekend workshop, charity fundraiser, etc.] that aims to [mention the primary goal of the event, e.g., promote awareness, foster innovation, support a cause, etc.]. This [mention the event's unique aspects, e.g., interactive, hands-on, thought-provoking] event will take place on [Event Date] at [Event Venue].</p>
<p><strong>What to Expect:</strong></p>
<p>At [Your Event Name], participants can look forward to:</p>
<ul>
<li>Engaging discussions led by industry experts on [relevant topics/themes].</li>
<li>Interactive workshops and practical sessions to enhance your skills in [specific area].</li>
<li>Inspirational talks from renowned speakers, sharing their insights on [relevant industry/subject].</li>
<li>Networking opportunities with fellow [professionals/students/enthusiasts], fostering meaningful connections.</li>
<li>[Any additional unique activities or features of the event, e.g., live demonstrations, product launches, etc.].</li>
</ul>
<p><strong>Who Should Attend:</strong></p>
<p>This event is perfect for [specify your target audience, e.g., professionals, students, entrepreneurs, tech enthusiasts, etc.] who are passionate about [related field/interest]. Whether you are a beginner looking to learn the basics or an experienced [professional/student] aiming to stay updated with the latest trends, [Your Event Name] has something valuable to offer to everyone.</p>
<p><strong>Agenda Highlights:</strong></p>
<ul>
<li>[Detailed description of key sessions, workshops, or activities planned throughout the event day. Include names of speakers, topics, and timings.]</li>
<li>[Additional agenda items, such as panel discussions, Q&amp;A sessions, networking breaks, etc.].</li>
</ul>
<p><strong>How to Participate:</strong></p>
<p>To secure your spot at [Your Event Name], register online at [Registration Link] before [Registration Deadline, if applicable]. Limited seats are available, so early registration is recommended.</p>
<p><strong>Ticket Information:</strong></p>
<ul>
<li>Regular Admission: [$X.XX]</li>
<li>Student Admission (with valid ID): [$X.XX]</li>
<li>[Any other ticket categories, discounts, or group rates, if applicable.]</li>
</ul>
<p>Don't miss this opportunity to be part of a [adjective, e.g., inspiring, informative, collaborative] event that promises to [mention the event's unique selling point, e.g., spark creativity, drive meaningful conversations, empower attendees]. Come join us for a day filled with knowledge, networking, and inspiration!</p>
<p>We look forward to welcoming you to [Your Event Name] and making this experience memorable for you.</p>" // Set initial editor content to empty string
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        onEditorChange={(content, editor) => {
          const element = document.getElementById(
            "description"
          ) as HTMLTextAreaElement | null;
          if (element && editorRef.current) {
            element.value = content; // Use value property to update textarea content
          }
        }}
        init={{
          height: 300,
          menubar: false,
        }}
      />
    </>
  );
};
