 const testFile = [
    {
    folders: [
      {
        name: "Folder 1",
        files: [
          { name: "File 1-1" },
          { name: "File 1-2" },
          { name: "File 1-3" }
        ],
        folders: [
          {
            name: "Subfolder 1-1",
            files: [
              { name: "File 1-1-1" },
              { name: "File 1-1-2" }
            ],
            folders: []
          },
          {
            name: "Subfolder 1-2",
            files: [
              { name: "File 1-2-1" },
              { name: "File 1-2-2" }
            ],
            folders: []
          }
        ]
      },
      {
        name: "Folder 2",
        files: [
          { name: "File 2-1" },
          { name: "File 2-2" }
        ],
        folders: [
          {
            name: "Subfolder 2-1",
            files: [],
            folders: [
              {
                name: "Sub-subfolder 2-1-1",
                files: [{ "name": "File 2-1-1-1" }],
                folders: []
              }
            ]
          }
        ]
      }
    ]
  }
]
export default testFile