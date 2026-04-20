import React from "react";
import { Activity, User } from "lucide-react";

function About() {
  return (
    <div className="w-full flex justify-center px-6 py-14 bg-gray-50">

      <div className="w-full max-w-5xl space-y-12">

        {/* ABOUT THIS SITE */}
        <div className="flex flex-col md:flex-row items-center gap-10 p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition">

          {/* Icon */}
          <div className="w-40 h-40 rounded-full bg-indigo-100 flex items-center justify-center">
            <Activity size={60} className="text-indigo-600" />
          </div>

          {/* Text */}
          <div className="flex-1">

            <h2 className="text-2xl font-semibold mb-3 relative inline-block">
              About this Site
              <span className="absolute left-0 -bottom-1 w-16 h-1 bg-indigo-500 rounded"></span>
            </h2>

            <p className="text-gray-600 leading-relaxed mt-4">
              This site <span className="font-medium">Semester Solution</span> is
              built with the intention of helping students easily access
              semester-wise resources. Students from different branches and
              semesters can quickly find study materials, course resources,
              and learning content required for their subjects in one place.
            </p>

            <p className="text-gray-600 leading-relaxed mt-3">
              The platform aims to reduce the effort students spend searching
              for materials and instead help them focus more on learning and
              understanding concepts effectively.
            </p>

          </div>

        </div>


        {/* DEVELOPER SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-10 p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition">

          {/* Text */}
          <div className="flex-1">

            <h2 className="text-2xl font-semibold mb-3 relative inline-block">
              Developer of this Site
              <span className="absolute left-0 -bottom-1 w-16 h-1 bg-indigo-500 rounded"></span>
            </h2>

            <p className="text-gray-600 leading-relaxed mt-4">
              Hey! I am <span className="font-medium">Vaibhav Sharma</span>, an
              ECE 2nd year student. I built this platform to solve a common
              problem faced by students — difficulty in finding organized
              semester resources.
            </p>

            <p className="text-gray-600 leading-relaxed mt-3">
              My goal is to create a centralized system where students can
              easily discover subject resources, notes, and study materials
              without wasting time searching across different sources.
            </p>

            <button className="mt-5 text-indigo-600 font-medium hover:underline flex items-center gap-1">
              Learn More →
            </button>

          </div>

          {/* Developer Icon */}
          <div className="w-40 h-40 rounded-full bg-indigo-100 flex items-center justify-center">
            <User size={60} className="text-indigo-600" />
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;