import React from 'react';

const GuildRank = ({
  submitRanksHandler,
  getRanks,
  setEditLeader,
  setEditVice,
  setEditMember,
  editMember,
}) => {
  return (
    <>
      <h3>Rename Guild Rank</h3>

      <form onSubmit={submitRanksHandler}>
        <section className="py-2 header">
          <div className="row">
            <div className="col-md-auto center">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  defaultValue={getRanks[0]?.name}
                  onChange={(e) => setEditLeader(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  defaultValue={getRanks[1]?.name}
                  onChange={(e) => setEditVice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  defaultValue={getRanks[2]?.name}
                  onChange={(e) =>
                    editMember?.length <= 0
                      ? setEditMember(getRanks[2]?.name)
                      : setEditMember(e.target.value)
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary waves-effect waves-themed col-lg-12"
              >
                Change Rank Title
              </button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default React.memo(GuildRank);
