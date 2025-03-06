'use client';

import { FC, useEffect, useState } from 'react';

interface DashboardData {
  activeCourses: number;
  pendingAssignments: number;
  attendanceRate: number;
  overallGrade: string;
}

const DashboardPage: FC = () => {
  const [data, setData] = useState<DashboardData>({
    activeCourses: 0,
    pendingAssignments: 0,
    attendanceRate: 0,
    overallGrade: '-'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [coursesRes, assignmentsRes, enrollmentsRes, attendanceRes] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/assignments'),
          fetch('/api/enrollments'),
          fetch('/api/attendance')
        ]);

        const coursesData = await coursesRes.json();
        const assignmentsData = await assignmentsRes.json();
        const enrollmentsData = await enrollmentsRes.json();
        const attendanceData = await attendanceRes.json();

        // Calculate active courses
        const activeCourses = coursesData.courses.filter(
          (course: any) => new Date(course.endDate) >= new Date()
        ).length;

        // Calculate pending assignments
        const pendingAssignments = assignmentsData.assignments.filter(
          (assignment: any) => new Date(assignment.dueDate) >= new Date()
        ).length;

        // Calculate attendance rate
        const totalAttendance = attendanceData.attendance.length;
        const presentAttendance = attendanceData.attendance.filter(
          (record: any) => record.status === 'present'
        ).length;
        const attendanceRate = totalAttendance > 0
          ? Math.round((presentAttendance / totalAttendance) * 100)
          : 0;

        // Calculate overall grade
        const grades = enrollmentsData.enrollments.map((enrollment: any) => enrollment.grade);
        const averageGrade = grades.length > 0
          ? Math.round(grades.reduce((a: number, b: number) => a + b, 0) / grades.length)
          : 0;
        
        // Convert numeric grade to letter grade
        const overallGrade = averageGrade >= 90 ? 'A' :
          averageGrade >= 80 ? 'B' :
          averageGrade >= 70 ? 'C' :
          averageGrade >= 60 ? 'D' : 'F';

        setData({
          activeCourses,
          pendingAssignments,
          attendanceRate,
          overallGrade
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Courses Card */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Active Courses</dt>
                  <dd className="mt-1 text-3xl font-semibold text-indigo-600">{data.activeCourses}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Assignments Card */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Pending Assignments</dt>
                  <dd className="mt-1 text-3xl font-semibold text-indigo-600">{data.pendingAssignments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Attendance Rate</dt>
                  <dd className="mt-1 text-3xl font-semibold text-indigo-600">{data.attendanceRate}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Grade Card */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Overall Grade</dt>
                  <dd className="mt-1 text-3xl font-semibold text-indigo-600">{data.overallGrade}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-6 flow-root">
              <ul className="-mb-8">
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">Submitted assignment <span className="font-medium text-gray-900">Introduction to React</span></p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>2h ago</time>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">Completed course <span className="font-medium text-gray-900">JavaScript Fundamentals</span></p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>1d ago</time>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Deadlines</h3>
            <div className="mt-6 flow-root">
              <ul className="divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                        <span className="text-sm font-medium leading-none text-red-600">24</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">Database Design Project</p>
                      <p className="truncate text-sm text-gray-500">Due in 2 days</p>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-sm font-medium leading-none text-yellow-600">28</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">API Integration Quiz</p>
                      <p className="truncate text-sm text-gray-500">Due in 5 days</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;